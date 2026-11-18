"use client";

import React, { useMemo } from "react";

export type CodeLanguage = "tsx" | "html" | "css" | "config";

interface SyntaxHighlightedCodeProps {
  code: string;
  language?: CodeLanguage;
  showLineNumbers?: boolean;
  className?: string;
}

interface Token {
  text: string;
  className?: string;
}

const TS_KEYWORDS = new Set([
  "import",
  "export",
  "from",
  "function",
  "return",
  "const",
  "let",
  "var",
  "type",
  "interface",
  "default",
  "satisfies",
  "extends",
  "implements",
  "async",
  "await",
  "if",
  "else",
  "switch",
  "case",
  "break",
  "new",
  "true",
  "false",
  "null",
  "undefined",
  "as",
  "typeof",
  "require",
]);

function tokenizeLine(line: string, language: CodeLanguage): Token[] {
  const tokens: Token[] = [];
  const tokenRegex =
    /(\/\/.*$|\/\*.*?\*\/|<!--.*?-->)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(@[a-zA-Z-]+\b)|(<\/?[A-Za-z][A-Za-z0-9.-]*)|(\/?>)|([a-zA-Z_:][a-zA-Z0-9_.:-]*)(?==)|\b([A-Za-z_$][A-Za-z0-9_$]*)\b/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index) });
    }

    const [
      fullMatch,
      comment,
      str,
      atRule,
      openTag,
      closeTag,
      attrName,
      ident,
    ] = match;

    if (comment) {
      tokens.push({ text: comment, className: "text-neutral-500 italic" });
    } else if (str) {
      tokens.push({ text: str, className: "text-emerald-300" });
    } else if (atRule) {
      tokens.push({ text: atRule, className: "text-pink-400" });
    } else if (openTag) {
      tokens.push({ text: openTag, className: "text-sky-400" });
    } else if (closeTag) {
      tokens.push({ text: closeTag, className: "text-sky-400" });
    } else if (attrName) {
      tokens.push({ text: attrName, className: "text-amber-300" });
    } else if (ident) {
      if (language !== "html" && TS_KEYWORDS.has(ident)) {
        tokens.push({ text: ident, className: "text-purple-400" });
      } else {
        tokens.push({ text: ident });
      }
    } else {
      tokens.push({ text: fullMatch });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex) });
  }

  return tokens;
}

function tokenizeDocument(code: string, language: CodeLanguage): Token[][] {
  const rawLines = code.split("\n");
  let inBlockComment = false;
  let inHtmlComment = false;

  return rawLines.map((line) => {
    if (inBlockComment) {
      const endIdx = line.indexOf("*/");
      if (endIdx === -1) {
        return [{ text: line, className: "text-neutral-500 italic" }];
      }
      inBlockComment = false;
      return [
        { text: line.slice(0, endIdx + 2), className: "text-neutral-500 italic" },
        ...tokenizeLine(line.slice(endIdx + 2), language),
      ];
    }

    if (inHtmlComment) {
      const endIdx = line.indexOf("-->");
      if (endIdx === -1) {
        return [{ text: line, className: "text-neutral-500 italic" }];
      }
      inHtmlComment = false;
      return [
        { text: line.slice(0, endIdx + 3), className: "text-neutral-500 italic" },
        ...tokenizeLine(line.slice(endIdx + 3), language),
      ];
    }

    const blockStart = line.indexOf("/*");
    if (blockStart !== -1 && line.indexOf("*/", blockStart + 2) === -1) {
      inBlockComment = true;
      return [
        ...tokenizeLine(line.slice(0, blockStart), language),
        { text: line.slice(blockStart), className: "text-neutral-500 italic" },
      ];
    }

    const htmlStart = line.indexOf("<!--");
    if (htmlStart !== -1 && line.indexOf("-->", htmlStart + 4) === -1) {
      inHtmlComment = true;
      return [
        ...tokenizeLine(line.slice(0, htmlStart), language),
        { text: line.slice(htmlStart), className: "text-neutral-500 italic" },
      ];
    }

    return tokenizeLine(line, language);
  });
}

export function SyntaxHighlightedCode({
  code,
  language = "tsx",
  showLineNumbers = true,
  className = "",
}: SyntaxHighlightedCodeProps) {
  const tokenizedLines = useMemo(
    () => tokenizeDocument(code, language),
    [code, language]
  );

  return (
    <pre
      className={`font-mono text-xs sm:text-[13px] text-neutral-200 leading-relaxed overflow-x-auto select-all ${className}`}
    >
      <code className="block min-w-max">
        {tokenizedLines.map((tokens, lineIdx) => (
          <div key={lineIdx} className="table-row">
            {showLineNumbers && (
              <span
                aria-hidden="true"
                className="table-cell pr-4 text-right text-[11px] text-neutral-600 select-none w-8 shrink-0"
              >
                {lineIdx + 1}
              </span>
            )}
            <span className="table-cell">
              {tokens.length > 0 ? (
                tokens.map((tok, tokIdx) =>
                  tok.className ? (
                    <span key={tokIdx} className={tok.className}>
                      {tok.text}
                    </span>
                  ) : (
                    <React.Fragment key={tokIdx}>{tok.text}</React.Fragment>
                  )
                )
              ) : (
                "\n"
              )}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}
