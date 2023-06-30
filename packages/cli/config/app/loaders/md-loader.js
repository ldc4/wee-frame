const MarkdownIt = require('markdown-it');
const { highlight: prismHighlight, languages: prismLanguages } = require('prismjs/components/prism-core');

require('prismjs/components/prism-clike');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-css');
require('prismjs/components/prism-less');

const md = new MarkdownIt({
  html: true,
  highlight(str, lang) {
    const langObj = prismLanguages[lang];
    const highlightCode = prismHighlight(str, langObj, lang);
    return `<pre class="language-${lang}"><code>${highlightCode}</code></pre>\n`;
  },
});

module.exports = function (source) {
  const content = md.render(source);
  const code = `
  import React from 'react';
  export default function MdPage() {
    return (
      <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(content)} }}></div>
    );
  }`;
  return code;
};
