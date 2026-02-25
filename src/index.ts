import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "jfrog-dummy-mcp",
  version: "1.0.2",
});

server.registerTool(
  "word-count",
  {
    title: "Word Count",
    description: "Count the number of words in the given text",
    inputSchema: {
      text: z.string().describe("The text to count words in"),
    },
  },
  async ({ text }: { text: string }) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const count = words.length;
    return {
      content: [{ type: "text", text: `Word count: ${count}` }],
    };
  },
);

server.registerTool(
  "letter-count",
  {
    title: "Letter Count",
    description: "Count the number of letters (a-z, A-Z) in the given text",
    inputSchema: {
      text: z.string().describe("The text to count letters in"),
    },
  },
  async ({ text }: { text: string }) => {
    const count = (text.match(/[a-zA-Z]/g) || []).length;
    return {
      content: [{ type: "text", text: `Letter count: ${count}` }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("JFrog dummy MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
