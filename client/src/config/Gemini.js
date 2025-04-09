import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

const baseModelConfig = {
  model: "gemini-1.5-flash",
};

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

/**
 * Runs the Gemini model with a given prompt, optionally enabling code execution.
 *
 * @param {string} prompt - The user's prompt.
 * @param {Array<object>} history - (Optional) The chat history.
 * @param {boolean} enableCodeExecution - (Optional) Whether to enable code execution.
 * @returns {Promise<string>} - The generated text response.
 */
async function run(prompt, history = [], enableCodeExecution = false) {
  const modelConfig = { ...baseModelConfig };
  if (enableCodeExecution) {
    modelConfig.tools = [{ codeExecution: {} }];
  }
  const modelWithTools = genAI.getGenerativeModel(modelConfig);

  const chatSession = modelWithTools.startChat({
    generationConfig,
    history: history,
  });

  const result = await chatSession.sendMessage(prompt);

  if (
    enableCodeExecution &&
    result?.response?.candidates?.[0]?.content?.parts
  ) {
    return extractCodeExecutionResult(result);
  }

  return result.response?.text() || "";
}

/**
 * Extracts the text content, including code execution results, from the Gemini response.
 *
 * @param {object} result - The response object from the Gemini API.
 * @returns {string} - The formatted text response.
 */
function extractCodeExecutionResult(result) {
  const parts = result.response.candidates[0].content.parts;
  let responseText = "";
  for (const part of parts) {
    if (part.text) {
      responseText += part.text;
    } else if (part.tool_calls) {
      for (const toolCall of part.tool_calls) {
        if (toolCall.function_response) {
          responseText += `\n**Code Execution Result:**\n${toolCall.function_response.content[0].text}\n`;
        }
      }
    }
  }
  return responseText;
}

export default run;
