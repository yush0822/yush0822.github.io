import { test, expect } from '@playwright/test'

test('프로젝트 펼치기, 이메일 복사, 인쇄 동작과 런타임 오류 확인', async ({ page, context }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('서비스의 흐름을')
  const details = page.locator('#withpet-details')
  await expect(details).toBeHidden()
  await page.getByRole('button', { name: '기여한 내용 자세히 보기' }).first().click()
  await expect(details).toBeVisible()
  await page.getByRole('button', { name: '프로젝트 상세 접기' }).click()
  await expect(details).toBeHidden()

  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByRole('button', { name: '이메일 주소 복사' }).click()
  await expect(page.getByRole('status')).toHaveText('이메일 주소를 복사했습니다.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('yush08222@gmail.com')

  await page.evaluate(() => { window.print = () => { document.body.dataset.printCalled = 'true' } })
  await page.getByRole('button', { name: '이력서 인쇄 / PDF' }).click()
  await expect(page.locator('body')).toHaveAttribute('data-print-called', 'true')
  await page.emulateMedia({ media: 'print' })
  await expect(details).toBeVisible()
  await expect(page.locator('#messenger-details')).toBeVisible()
  await page.pdf({ path: 'test-results/resume.pdf', format: 'A4', preferCSSPageSize: true })
  expect(errors).toEqual([])
})

test('클립보드 권한 거부 시 안내', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('permission denied') } }, configurable: true })
  })
  await page.getByRole('button', { name: '이메일 주소 복사' }).click()
  await expect(page.getByRole('status')).toContainText('복사하지 못했습니다')
})

test('모바일 메뉴 이동 및 Escape 키 닫기', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: '주요 메뉴' })
  await expect(nav).toBeHidden()
  await page.getByRole('button', { name: '메뉴 열기' }).click()
  await expect(nav).toBeVisible()
  await nav.getByRole('link', { name: '프로젝트', exact: true }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(nav).toBeHidden()
  await page.getByRole('button', { name: '메뉴 열기' }).click()
  await nav.getByRole('link', { name: '소개', exact: true }).focus()
  await page.keyboard.press('Escape')
  await expect(nav).toBeHidden()
  await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeFocused()
})

for (const width of [320, 375, 768, 1440]) {
  test(`${width}px 화면 넘침 및 내부 링크 확인`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => href !== '#' && !document.getElementById(href.slice(1))))
    expect(missingTargets).toEqual([])
    if (width === 1440 || width === 375) await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true })
  })
}
