"use client";

import React from "react";

const HTML_PROSE_CLASSES = [
  "text-[15px] min-[501px]:text-base text-black/80",
  "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  "[&_p]:my-3 [&_p]:leading-relaxed",
  "[&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:mt-6 [&_h1]:mb-2",
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2",
  "[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-1.5",
  "[&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-10 [&_ul]:my-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1",
  "[&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-10 [&_ol]:my-3 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-1",
  "[&_li]:leading-relaxed",
  "[&_a]:text-cyan-500 [&_a]:underline hover:[&_a]:text-cyan-600",
  "[&_strong]:font-semibold [&_b]:font-semibold",
  "[&_em]:italic [&_i]:italic",
  "[&_mark]:bg-yellow-200 [&_mark]:px-1 [&_mark]:rounded-sm",
  "[&_u]:underline",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-cyan-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-black/70",
  "[&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.9em]",
].join(" ");

// Section labels commonly used in job postings — used to detect implicit headers
// in plain-text descriptions and promote them into <h4> elements. Bare-word
// entries ("Requirements", "About", "Overview") are intentionally omitted
// because they collide with normal body text (e.g. "ambiguous requirements").
const KNOWN_SECTION_HEADERS = [
  "About Zare Innovations",
  "About Zare",
  "About Us",
  "The Role",
  "The Position",
  "Position Overview",
  "Role Overview",
  "Key Responsibilities",
  "What You Will Do",
  "What you will do",
  "Technical Qualifications",
  "Required Qualifications",
  "The Ideal Candidate",
  "Ideal Candidate",
  "Who You Are",
  "Why Join Us",
  "Why Join Us?",
  "What We Offer",
  "Perks & Benefits",
];

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// A header only counts when it's preceded by a real section boundary — start
// of the string, sentence-ending punctuation, a newline, or a run of 3+ spaces
// (the "collapsed newline" artifact common in plain-text job descriptions).
// This prevents mid-sentence keyword hits like "…ambiguous requirements…".
const HEADER_REGEX = new RegExp(
  `(?<=^|[.!?]\\s+|\\n\\s*|\\s{3,})(${[...KNOWN_SECTION_HEADERS]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join("|")})\\??(?=\\s|$)`,
  "gi"
);

// Heuristic: treat content as HTML if it contains at least one HTML tag we
// would emit from the Tiptap editor (StarterKit + link/underline/etc.).
const isHtmlContent = (content: string): boolean =>
  /<(p|div|h[1-6]|ul|ol|li|strong|em|a|br|blockquote|code|mark|u|b|i)[\s>]/i.test(
    content
  );

// Render a plain-text block, splitting on the "•" character to build a list.
const renderTextBlock = (
  content: string,
  keyBase: string
): React.ReactNode[] => {
  // Normalize wide whitespace gaps to paragraph breaks. Some job descriptions
  // arrive as one long string with runs of spaces where newlines used to be.
  const normalized = content
    .replace(/[ \t]{4,}/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.flatMap<React.ReactNode>((paragraph, pIdx) => {
    // If the paragraph contains bullet markers, split it into intro + list.
    if (paragraph.includes("•")) {
      const parts = paragraph
        .split(/\s*•\s*/)
        .map((p) => p.trim())
        .filter(Boolean);

      const startsWithBullet = paragraph.trimStart().startsWith("•");
      const intro = startsWithBullet ? null : parts[0];
      const bullets = startsWithBullet ? parts : parts.slice(1);

      const nodes: React.ReactNode[] = [];
      if (intro) {
        nodes.push(
          <p
            key={`${keyBase}-${pIdx}-intro`}
            className="my-3 leading-relaxed"
          >
            {intro}
          </p>
        );
      }
      if (bullets.length) {
        nodes.push(
          <ul
            key={`${keyBase}-${pIdx}-list`}
            className="list-disc pl-5 sm:pl-10 my-3 flex flex-col gap-1.5"
          >
            {bullets.map((b, bIdx) => (
              <li key={bIdx} className="leading-relaxed">
                {b}
              </li>
            ))}
          </ul>
        );
      }
      return nodes;
    }

    return [
      <p
        key={`${keyBase}-${pIdx}`}
        className="my-3 leading-relaxed whitespace-pre-line"
      >
        {paragraph}
      </p>,
    ];
  });
};

// Parse plain-text into sections. Known headers get promoted to <h4>, the
// content between headers becomes paragraphs/lists via renderTextBlock.
const renderPlainText = (text: string): React.ReactNode => {
  const cleaned = text.trim();
  if (!cleaned) return null;

  // Reset regex state each call (headerRegex is a module-level singleton).
  HEADER_REGEX.lastIndex = 0;

  const matches: Array<{ header: string; start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = HEADER_REGEX.exec(cleaned)) !== null) {
    matches.push({
      header: m[1],
      start: m.index,
      end: m.index + m[0].length,
    });
  }

  if (matches.length === 0) {
    return <div>{renderTextBlock(cleaned, "root")}</div>;
  }

  const nodes: React.ReactNode[] = [];

  // Anything before the first header
  if (matches[0].start > 0) {
    const pre = cleaned.slice(0, matches[0].start).trim();
    if (pre) nodes.push(...renderTextBlock(pre, "pre"));
  }

  matches.forEach((match, idx) => {
    const contentEnd =
      idx < matches.length - 1 ? matches[idx + 1].start : cleaned.length;
    const body = cleaned.slice(match.end, contentEnd).trim();

    nodes.push(
      <section key={`section-${idx}`} className="mt-6 first:mt-0">
        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2">
          {match.header}
        </h4>
        {renderTextBlock(body, `section-${idx}-body`)}
      </section>
    );
  });

  return <div>{nodes}</div>;
};

export default function JobDescription({ content }: { content: string }) {
  if (!content?.trim()) {
    return (
      <p className="text-[15px] min-[501px]:text-base text-black/60">
        No description provided.
      </p>
    );
  }

  if (isHtmlContent(content)) {
    return (
      <div
        className={HTML_PROSE_CLASSES}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="text-[15px] min-[501px]:text-base text-black/80">
      {renderPlainText(content)}
    </div>
  );
}
