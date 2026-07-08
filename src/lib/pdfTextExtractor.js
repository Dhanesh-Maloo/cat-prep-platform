import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href

async function extractPageText(page) {
  const content = await page.getTextContent()
  let text = ''
  let lastY = null
  for (const item of content.items) {
    const y = item.transform[5]
    if (lastY !== null && Math.abs(y - lastY) > 1) {
      text += '\n'
    } else if (text && !text.endsWith(' ') && !text.endsWith('\n')) {
      text += ' '
    }
    text += item.str
    lastY = y
  }
  return text
}

/** Extracts plain text from a PDF File/Blob, preserving line breaks by text-item y-position. */
export async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const pageTexts = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    pageTexts.push(await extractPageText(page))
  }
  return pageTexts.join('\n')
}
