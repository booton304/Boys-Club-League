import fs from 'fs';
import path from 'path';

async function generateBlogPost() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Define the direct REST API endpoint for Gemini
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // 1. Fetch League Context
  const leagueContext = "Recent waiver wire moves and trades in The Boy's Club league.";

  // 2. Generate Content
  const prompt = `Write a dramatic, engaging 300-word blog post for a fantasy football league named The Boy's Club. Use this context: ${leagueContext}. Format it in Markdown with a Title, Date, and Author frontmatter.`;

  // Format the payload according to the Gemini REST API specifications
  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  // Execute the REST API call
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();
  
  // Extract the text from the API response structure
  const blogContent = data.candidates[0].content.parts[0].text;

  // 3. Save to File System
  const dateString = new Date().toISOString().split('T')[0];
  const fileName = `blog-post-${dateString}.md`;
  
  // Adjust the directory path below to match your Next.js blog content structure
  const filePath = path.join(process.cwd(), 'posts', fileName);

  fs.writeFileSync(filePath, blogContent);
  console.log(`Successfully generated and saved ${fileName}`);
}

generateBlogPost();
