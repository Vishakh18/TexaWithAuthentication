import React, { useState, useEffect, useRef, useContext } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { ReactTyped } from "react-typed";
import { AppContent } from "../../context/AppContent";

function GeminiChatDisplay({ response }) {
  const responseRef = useRef(null);
  const [highlightedResponse, setHighlightedResponse] = useState("");
  const { spk } = useContext(AppContent);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }

    // Highlight code and format the text
    let formatted = highlightCode(response);
    formatted = formatTextContent(formatted);

    setHighlightedResponse(formatted);
  }, [response]);

  // Highlight code blocks
  const highlightCode = (text) => {
    const codeRegex = /```([\w-]+)?\n([\s\S]*?)\n```/g;
    return text.replace(codeRegex, (match, language, code) => {
      const highlightedCode = language
        ? hljs.highlight(code, { language }).value
        : hljs.highlightAuto(code).value;
      return `<pre><code class="${
        language ? `language-${language}` : "hljs"
      }">${highlightedCode}</code></pre>`;
    });
  };

  // Format non-code text
  const formatTextContent = (text) => {
    // Headings
    let formatted = text.replace(/^### (.*$)/gim, "🔹 $1");
    formatted = formatted.replace(/^## (.*$)/gim, "🔸 $1");
    formatted = formatted.replace(/^# (.*$)/gim, "🔷 $1");

    // Bold and Italic
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, (_, match) =>
      match.toUpperCase()
    );
    formatted = formatted.replace(/\*(.*?)\*/g, "_$1_");

    // Lists
    formatted = formatted.replace(/^- (.*$)/gim, "• $1");
    formatted = formatted.replace(/^\* (.*$)/gim, "• $1");

    // Paragraph spacing and line breaks
    formatted = formatted.replace(/\n{2,}/g, "\n\n");
    formatted = formatted.replace(/\n/g, "\n");

    return formatted.trim();
  };

  return (
    <div className="mt-8 mr-4">
      <div ref={responseRef} className="mb-20  whitespace-pre-wrap">
        <ReactTyped
          strings={[highlightedResponse]}
          typeSpeed={15}
          className="mr-10"
        />
      </div>
    </div>
  );
}

export default GeminiChatDisplay;
