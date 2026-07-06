import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'
import { writeFileSync, mkdtempSync, readFileSync, rmSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'typst-local',
      configureServer(server) {
        server.middlewares.use('/api/compile', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'POST required' }))
            return
          }

          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk)
          let source: string
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString())
            source = body.source
            if (!source) throw new Error('Missing source')
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid JSON body' }))
            return
          }

          const tmpDir = mkdtempSync('/tmp/typst-')
          const inputPath = join(tmpDir, 'main.typ')
          const outputPath = join(tmpDir, 'output.pdf')

          try {
            writeFileSync(inputPath, source, 'utf-8')
            execSync(`typst compile "${inputPath}" "${outputPath}" 2>&1`, {
              timeout: 30000,
              cwd: tmpDir,
            })
            const pdf = readFileSync(outputPath)
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Length', pdf.length)
            res.end(pdf)
          } catch (err) {
            const msg = err instanceof Error ? err.message : 'Compilation failed'
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: msg }))
          } finally {
            rmSync(tmpDir, { recursive: true, force: true })
          }
        })
      },
    },
  ],
})
