import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

export const resumeFilename = '유승환이력서.pdf'

export function readResume(root: string): Buffer | undefined {
  const path = resolve(root, resumeFilename)
  if (!existsSync(path)) return undefined
  const source = readFileSync(path)
  if (source.subarray(0, 5).toString() !== '%PDF-') throw new Error(`${resumeFilename} 파일이 올바른 PDF 형식이 아닙니다.`)
  return source
}

export function resumeAsset(root: string): Plugin {
  const source = readResume(root)
  return {
    name: 'portfolio-resume',
    config: () => ({ define: { __RESUME_AVAILABLE__: JSON.stringify(Boolean(source)) } }),
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0]
        if (!source || (path !== `/${resumeFilename}` && path !== encodeURI(`/${resumeFilename}`))) return next()
        response.setHeader('Content-Type', 'application/pdf')
        response.setHeader('Content-Length', source.byteLength)
        response.end(request.method === 'HEAD' ? undefined : source)
      })
    },
    generateBundle() {
      if (source) this.emitFile({ type: 'asset', fileName: resumeFilename, source })
    },
  }
}
