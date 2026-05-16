const OpenAI = require('openai');
const { openAiApiKey } = require('../config/env');

const client = openAiApiKey ? new OpenAI({ apiKey: openAiApiKey }) : null;

exports.createTitle = async (content) => {
  if (!client) {
    const firstLine = content.trim().split('\n')[0] || '';
    return `Suggested title for note: ${firstLine.substring(0, 40)}`;
  }

  const prompt = `Create a concise and professional title for the following note text:\n\n${content}`;

  try {
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      max_tokens: 20,
    });

    return response.output?.[0]?.content?.[0]?.text?.trim() || 'AI could not suggest a title.';
  } catch (error) {
    console.error('OpenAI title error:', error);
    return 'Unable to generate title at this time.';
  }
};

exports.createSummary = async (title, content) => {
  if (!client) {
    return `AI summary placeholder for "${title}". Content length: ${content.length} characters.`;
  }

  const prompt = `Write a concise, actionable summary for this note titled "${title}":\n\n${content}`;

  try {
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      max_tokens: 150,
    });

    return response.output?.[0]?.content?.[0]?.text?.trim() || 'Summary could not be generated.';
  } catch (error) {
    console.error('OpenAI summary error:', error);
    return 'Unable to generate summary at this time.';
  }
};
