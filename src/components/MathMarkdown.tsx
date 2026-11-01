import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Terminal } from 'lucide-react';

interface MathMarkdownProps {
  content: string;
  isStreaming?: boolean;
}

/**
 * Pre-process LaTeX delimiters to guarantee compatibility with remark-math:
 * 1. Convert \[ ... \] to $$ ... $$ (display math)
 * 2. Convert \( ... \) to $ ... $ (inline math)
 * 3. Safely handle trailing unclosed math delimiters during live streaming
 */
function normalizeLatexDelimiters(input: string, isStreaming?: boolean): string {
  if (!input) return '';

  let text = input;

  // Replace \[ and \] display math blocks with $$
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, equation) => `\n$$\n${equation.trim()}\n$$\n`);

  // Replace \( and \) inline math blocks with $
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, equation) => `$${equation.trim()}$`);

  // If streaming and text ends with an unclosed single $ or $$, temporarily close it for KaTeX parser safety
  if (isStreaming) {
    const doubleDollarCount = (text.match(/\$\$/g) || []).length;
    if (doubleDollarCount % 2 !== 0) {
      text = text + ' $$';
    } else {
      // Check single $ count (excluding $$)
      const sanitized = text.replace(/\$\$/g, '');
      const singleDollarCount = (sanitized.match(/\$/g) || []).length;
      if (singleDollarCount % 2 !== 0) {
        text = text + ' $';
      }
    }
  }

  return text;
}

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ inline, className, children }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';
  const textContent = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="px-1.5 py-0.5 rounded bg-slate-900/90 text-cyan-300 border border-slate-700/80 font-mono text-[11px] sm:text-xs">
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-slate-800 bg-[#070b14] shadow-lg group">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Terminal className="w-3 h-3" />
          {lang ? lang.toUpperCase() : 'CODE'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-cyan-300 text-slate-400 transition-colors p-1 rounded"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto text-xs font-mono text-slate-200 selection:bg-cyan-500/30">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

export const MathMarkdown: React.FC<MathMarkdownProps> = ({ content, isStreaming }) => {
  const processedContent = useMemo(
    () => normalizeLatexDelimiters(content, isStreaming),
    [content, isStreaming]
  );

  return (
    <div className="math-markdown-container text-xs sm:text-sm leading-relaxed text-slate-200 selection:bg-cyan-500/30">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[
          [
            rehypeKatex,
            {
              throwOnError: false,
              errorColor: '#f43f5e',
              strict: false,
            },
          ],
        ]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg sm:text-xl font-bold font-mono text-cyan-300 mt-4 mb-2 pb-1.5 border-b border-slate-800/80 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-cyan-400 rounded-full inline-block" />
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base sm:text-lg font-bold font-mono text-cyan-200 mt-3.5 mb-2 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-blue-400 rounded-full inline-block" />
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm sm:text-base font-semibold font-mono text-slate-100 mt-3 mb-1.5">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold font-mono text-cyan-400 mt-2.5 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="mb-2.5 last:mb-0 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-cyan-100">{children}</strong>,
          em: ({ children }) => <em className="text-slate-300 italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2.5 space-y-1.5 marker:text-cyan-400 text-slate-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2.5 space-y-1.5 marker:text-cyan-400 text-slate-200 font-sans">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed pl-0.5">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-cyan-400 pl-3.5 py-1.5 my-3 bg-cyan-950/20 rounded-r-xl text-slate-300 text-xs italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-slate-800/80 my-4" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded-xl border border-slate-800/90 shadow-md">
              <table className="min-w-full divide-y divide-slate-800 text-left text-xs">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-900/90 text-cyan-300 font-mono">{children}</thead>,
          tbody: ({ children }) => <tbody className="divide-y divide-slate-800/70 bg-slate-950/40">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-slate-900/40 transition-colors">{children}</tr>,
          th: ({ children }) => (
            <th className="px-3.5 py-2 font-mono font-bold text-cyan-300 border-b border-slate-700/80 tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2 text-slate-200 border-b border-slate-800/60 font-sans leading-relaxed">
              {children}
            </td>
          ),
          code: CodeBlock as any,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};
