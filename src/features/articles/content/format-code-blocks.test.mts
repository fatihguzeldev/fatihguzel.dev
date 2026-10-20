import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseDocument, renderHtml } from '@fatihguzeldev/vemi'
import { formatCodeBlocks } from './format-code-blocks'

test('code labels use the authored language without a language allowlist', () => {
  for (const language of ['c', 'rust', 'custom-lang', 'c++', 'ts']) {
    const source = `\`\`\`${language}\nfirst line\nsecond line\n\`\`\``
    const html = formatCodeBlocks(
      renderHtml(parseDocument(source), { classPrefix: 'vemi' }),
    )

    assert.ok(
      html.includes(
        `<pre class="vemi-code-block" data-language="${language}"><code class="language-${language}">`,
      ),
      `${language}: ${html}`,
    )
    assert.ok(html.includes('data-line="1"'))
    assert.ok(html.includes('data-line="2"'))
    assert.ok(html.includes('class="vemi-code-line-content">first line</span>'))
    assert.ok(html.includes('class="vemi-code-line-content">second line</span>'))
  }
})

test('unlabelled code blocks use text and each block keeps its own label', () => {
  const source = '```c\nint count;\n```\n\n```\nplain output\n```'
  const html = formatCodeBlocks(
    renderHtml(parseDocument(source), { classPrefix: 'vemi' }),
  )

  assert.deepEqual(
    [...html.matchAll(/data-language="([^"]+)"/g)].map((match) => match[1]),
    ['c', 'text'],
  )
  assert.equal([...html.matchAll(/data-line="1"/g)].length, 2)
})

test('language labels and code retain the escaping provided by vemi', () => {
  const source = '```lang"quoted&\n<div>"hello"</div>\n```'
  const html = formatCodeBlocks(
    renderHtml(parseDocument(source), { classPrefix: 'vemi' }),
  )

  assert.ok(html.includes('data-language="lang&quot;quoted&amp;"'))
  assert.ok(html.includes('&lt;div&gt;"hello"&lt;/div&gt;'))
  assert.equal(html.includes('<div>'), false)
})
