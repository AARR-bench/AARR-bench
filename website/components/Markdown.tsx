import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-brand-300 prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-brand-200 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:border prose-pre:border-white/[0.08] prose-pre:bg-ink-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
