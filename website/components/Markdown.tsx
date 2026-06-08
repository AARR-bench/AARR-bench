import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-ink-700 prose-li:text-ink-700 prose-strong:text-ink prose-a:text-ink prose-a:underline prose-code:rounded-none prose-code:border prose-code:border-ink-100 prose-code:bg-paper-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-ink prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:rounded-none prose-pre:border prose-pre:border-ink-100 prose-pre:bg-term-bg prose-pre:text-term-text">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
