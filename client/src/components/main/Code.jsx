import React, { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { ReactTyped } from "react-typed";
function GeminiChatDisplay({ response }) {
  const responseRef = useRef(null);
  const [highlightedResponse, setHighlightedResponse] = useState("");

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
    setHighlightedResponse(highlightCode(response));
  }, [response]);

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

  return (
    <div className="mt-8 mr-4">
      <div ref={responseRef} className="mb-20">
        {" "}
        <ReactTyped
          strings={[highlightedResponse]}
          typeSpeed={15}
          className="mr-10"
        ></ReactTyped>
      </div>
    </div>
  );
}

export default GeminiChatDisplay;
