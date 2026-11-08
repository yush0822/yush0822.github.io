import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { findResumePath } from '../build/resume'

const resumeSourcePath = findResumePath(process.cwd())

test('여섯 섹션, 프로젝트 상세 이동과 브라우저 이력', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: '주요 메뉴' })
  for (const name of ['Home', 'About Me', '스킬 및 역량', 'Projects', 'Experience', 'Contact']) {
    await expect(nav.getByRole('link', { name, exact: true })).toBeVisible()
    await expect(page.getByRole('region', { name, exact: true })).toBeAttached()
  }
  await expect(page.getByRole('heading', { level: 1 })).toContainText('설계부터 배포까지')
  await nav.getByRole('link', { name: 'Projects', exact: true }).click()
  await page.getByRole('link', { name: 'RailDock 상세 보기', exact: true }).click()
  await expect(page).toHaveURL(/#\/projects\/raildock$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RailDock.')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await expect(page.getByRole('link', { name: 'GitHub · 프론트엔드' }).first()).toHaveAttribute('href', 'https://github.com/AIVLE-08-14/raildock-front')
  await page.reload()
  await expect(page.getByRole('heading', { name: '주요 기능 및 구현 내용' })).toBeAttached()
  await page.goBack()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.getByRole('region', { name: 'Projects', exact: true })).toBeVisible()
  await page.goForward()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RailDock.')
  expect(errors).toEqual([])
})

test('상세 목차 직접 링크와 비공개 저장소 안내', async ({ page }) => {
  await page.goto('/#/projects/club/architecture')
  await expect(page.getByRole('heading', { name: '시스템 아키텍처' })).toBeInViewport()
  await expect(page.locator('.case-hero')).toContainText('GitHub 비공개')
  await expect(page.locator('.case-hero a[href^="https://github.com"]')).toHaveCount(0)
  await page.getByRole('navigation', { name: '프로젝트 상세 목차' }).getByRole('link', { name: /문제 해결/ }).click()
  await expect(page.getByRole('heading', { name: '기술적 문제와 해결 과정' })).toBeInViewport()
  await page.reload()
  await expect(page.getByRole('heading', { name: '기술적 문제와 해결 과정' })).toBeInViewport()
  await page.emulateMedia({ media: 'print' })
  await expect(page.getByRole('heading', { name: '프로젝트 결과 및 회고' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: '프로젝트 상세 목차' })).toBeHidden()
})

test('잘못된 상세 주소에서 프로젝트 목록으로 복귀', async ({ page }) => {
  await page.goto('/#/projects/unknown')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('프로젝트를 찾을 수 없습니다.')
  await page.getByRole('link', { name: '전체 프로젝트로 돌아가기' }).click()
  await expect(page.getByRole('region', { name: 'Projects', exact: true })).toBeVisible()
})

test('이메일 복사 성공과 권한 거부 안내', async ({ page, context }) => {
  await page.goto('/#contact')
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByRole('button', { name: '이메일 주소 복사' }).click()
  await expect(page.getByRole('status')).toHaveText('이메일 주소를 복사했습니다.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('yush08222@gmail.com')
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('permission denied') } }, configurable: true })
  })
  await page.getByRole('button', { name: '이메일 주소 복사' }).click()
  await expect(page.getByRole('status')).toContainText('복사하지 못했습니다')
})

test('PDF 유무에 맞춰 준비 상태 또는 실제 파일 다운로드', async ({ page }, testInfo) => {
  await page.goto('/#contact')
  if (!resumeSourcePath) {
    await expect(page.getByRole('button', { name: '이력서 PDF 준비 중' })).toBeDisabled()
    await expect(page.getByRole('link', { name: '이력서 PDF 다운로드' })).toHaveCount(0)
  } else {
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('link', { name: '이력서 PDF 다운로드' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe('유승환이력서.pdf')
    const output = testInfo.outputPath('resume.pdf')
    await download.saveAs(output)
    expect(await readFile(output)).toEqual(await readFile(resumeSourcePath))
  }
})

test('모바일 메뉴와 상세 페이지에서 섹션 이동', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/#/projects/raildock')
  const nav = page.getByRole('navigation', { name: '주요 메뉴' })
  await expect(nav).toBeHidden()
  await page.getByRole('button', { name: '메뉴 열기' }).click()
  await nav.getByRole('link', { name: 'About Me', exact: true }).click()
  await expect(page).toHaveURL(/#about$/)
  await expect(nav).toBeHidden()
  await expect(page.getByRole('heading', { name: 'About Me.' })).toBeInViewport()
  await page.getByRole('button', { name: '메뉴 열기' }).click()
  await nav.getByRole('link', { name: 'Contact', exact: true }).focus()
  await page.keyboard.press('Escape')
  await expect(nav).toBeHidden()
  await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeFocused()
})

for (const width of [320, 375, 768, 1440]) {
  test(`${width}px 메인 및 상세 페이지 화면 넘침과 링크`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    for (const route of ['/', '/#/projects/raildock', '/#/projects/club', '/#/projects/adoption']) {
      await page.goto(route)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !href.startsWith('#/') && href !== '#' && !document.getElementById(href.slice(1))))
      // Main-section links on detail pages navigate back to the landing page.
      expect(missingTargets.filter(href => route === '/' || !['#home', '#about', '#tech-stack', '#projects', '#experience', '#contact'].includes(href))).toEqual([])
      if (width === 1440 || width === 375) {
        const name = route === '/' ? 'home' : route.split('/').at(-1)
        await page.screenshot({ path: `test-results/${name}-${width}.png`, fullPage: false })
      }
    }
  })
}
