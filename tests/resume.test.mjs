import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, readFile, access, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { build } from 'vite'
import { findResumePath, readResume, resumeAsset, resumeFilename } from '../build/resume.ts'

async function removeFixture(root) {
  assert.equal(dirname(resolve(root)), resolve(tmpdir()))
  assert.ok(basename(root).startsWith('portfolio-resume-'))
  await rm(root, { recursive: true, force: true })
}

test('루트 PDF가 없으면 빌드에 다운로드 파일을 포함하지 않음', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-resume-'))
  try {
    await writeFile(join(root, 'index.html'), '<!doctype html><title>Resume test</title>')
    assert.equal(readResume(root), undefined)
    const plugin = resumeAsset(root)
    assert.equal(plugin.config().define.__RESUME_AVAILABLE__, 'false')
    await build({ configFile: false, root, plugins: [plugin], logLevel: 'silent' })
    await assert.rejects(access(join(root, 'dist', resumeFilename)))
  } finally { await removeFixture(root) }
})

test('루트에 PDF를 추가하면 동일한 파일명과 내용으로 배포 빌드에 포함', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-resume-'))
  try {
    const fixture = Buffer.from('%PDF-1.4\n% integration test fixture\n%%EOF\n')
    await writeFile(join(root, 'index.html'), '<!doctype html><title>Resume test</title>')
    await writeFile(join(root, resumeFilename), fixture)
    const plugin = resumeAsset(root)
    assert.equal(plugin.config().define.__RESUME_AVAILABLE__, 'true')
    await build({ configFile: false, root, plugins: [plugin], logLevel: 'silent' })
    assert.deepEqual(await readFile(join(root, 'dist', resumeFilename)), fixture)
  } finally { await removeFixture(root) }
})

test('PDF 확장자로 잘못 저장한 다른 형식은 빌드 전에 확인', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-resume-'))
  try {
    await writeFile(join(root, resumeFilename), '<html>Not a PDF</html>')
    assert.throws(() => readResume(root), /PDF 형식/)
  } finally { await removeFixture(root) }
})

test('이력서.pdf 원본도 다운로드 파일명으로 빌드하고 표준 파일명이 있으면 우선 사용', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-resume-'))
  try {
    const fixture = Buffer.from('%PDF-1.4\n% final resume filename fixture\n%%EOF\n')
    await writeFile(join(root, 'index.html'), '<!doctype html><title>Resume test</title>')
    await writeFile(join(root, '이력서.pdf'), fixture)
    assert.equal(findResumePath(root), join(root, '이력서.pdf'))
    await build({ configFile: false, root, plugins: [resumeAsset(root)], logLevel: 'silent' })
    assert.deepEqual(await readFile(join(root, 'dist', resumeFilename)), fixture)
    await writeFile(join(root, resumeFilename), '%PDF-1.4\n% canonical resume\n%%EOF\n')
    assert.equal(findResumePath(root), join(root, resumeFilename))
  } finally { await removeFixture(root) }
})
