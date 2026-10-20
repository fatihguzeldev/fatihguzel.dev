function renderCodeLine(line: string, index: number): string {
  return [
    '<span class="vemi-code-line">',
    `<span class="vemi-code-line-number" data-line="${index + 1}" aria-hidden="true"></span>`,
    `<span class="vemi-code-line-content">${line}</span>`,
    '</span>',
  ].join('')
}

export function formatCodeBlocks(html: string): string {
  return html.replace(
    /<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (_match, preAttributes: string, codeAttributes: string, code: string) => {
      const language = /class="language-([^"]+)"/.exec(codeAttributes)?.[1] ?? 'text'
      const lines = code.split('\n')
      const numberedCode = lines.map(renderCodeLine).join('')

      return `<pre${preAttributes} data-language="${language}"><code${codeAttributes}>${numberedCode}</code></pre>`
    },
  )
}
