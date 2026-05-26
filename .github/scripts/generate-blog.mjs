import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateBlogPost() {
  // 1. Fetch League Context
  // You will eventually replace this string with actual fetch calls to the Sleeper API
  const leagueContext = "Recent waiver wire moves and trades in The Boy's Club league.";

  // 2. Generate Content
  const prompt = `Write a dramatic, engaging 300-word blog post for a fantasy football league named The Boy's Club. Use this context: ${leagueContext}. Format it in Markdown with a Title, Date, and Author frontmatter.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const blogContent = response.text;

  // 3. Save to File System
  const dateString = new Date().toISOString().split('T')[0];
  const fileName = `blog-post-${dateString}.md`;
  
  // Adjust the directory path below to match your Next.js blog content structure
  const filePath = path.join(process.cwd(), 'posts', fileName);

  fs.writeFileSync(filePath, blogContent);
  console.log(`Successfully generated and saved ${fileName}`);
}

generateBlogPost();
