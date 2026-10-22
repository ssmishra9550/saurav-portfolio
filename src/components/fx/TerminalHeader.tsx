import React from "react";

/** Tiny, dependency-free syntax highlighter for the decorative code streams. */

const KEYWORDS = new Set([
  "public", "private", "async", "await", "return", "var", "const", "let", "new", "if", "else",
  "foreach", "in", "using", "switch", "this", "DECLARE", "INSERT", "INTO", "SELECT", "FROM",
  "WHERE", "WITH", "EXEC", "AND", "OR", "out", "_", "true", "false", "null",
]);

const TOKEN_RE =
  /(\/\/.*$|--.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_@$][\w$]*)(?=\s*\()|([A-Za-z_@$][\w$]*)|(\s+)|([^\w\s])|(.)/g;

function highlight(line: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line)) !== null) {
    const [tok, com, str, num, fn, word] = m;
    let cls = "tok-txt";
    if (com) cls = "tok-com";
    else if (str) cls = "tok-str";
    else if (num) cls = "tok-num";
    else if (fn) cls = "tok-fn";
    else if (word) {
      if (KEYWORDS.has(word)) cls = "tok-kw";
      else if (/^[A-Z][a-zA-Z0-9]*$/.test(word)) cls = "tok-type";
    }
    out.push(
      <span key={`${keyPrefix}-${i++}`} className={cls}>
        {tok}
      </span>
    );
    if (com) break;
  }
  return out;
}

interface TerminalHeaderProps {
  file: string;
  lines: string[];
  speed?: number; // seconds for one full loop
}

export default function TerminalHeader({ file, lines, speed }: TerminalHeaderProps) {
  // Duplicate the stream so translateY(-50%) loops seamlessly
  const loop = [...lines, ...lines];
  const duration = speed ?? Math.max(10, lines.length * 1.6);

  return (
    <div className="term" aria-hidden="true">
      <div className="term-bar">
        <span className="term-dot bg-[#ff5f57]" />
        <span className="term-dot bg-[#febc2e]" />
        <span className="term-dot bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[10.5px] text-slate-400">{file}</span>
        <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-[#00e5b0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00e5b0] shadow-[0_0_8px_#00e5b0] animate-pulse" />
          live
        </span>
      </div>
      <div className="term-body">
        <div className="term-stream" style={{ ["--term-duration" as string]: `${duration}s` }}>
          {loop.map((line, idx) => (
            <div key={idx}>
              <span className="mr-3 inline-block w-4 select-none text-right text-slate-600">
                {(idx % lines.length) + 1}
              </span>
              {highlight(line, `${idx}`)}
              {idx % lines.length === lines.length - 1 && <span className="term-caret" />}
            </div>
          ))}
        </div>
        <div className="term-scanline" />
      </div>
    </div>
  );
}
