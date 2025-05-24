import axios from 'axios';

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function askClaude(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'anthropic/claude-3-sonnet',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 512,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // Adapter selon la structure de la réponse OpenRouter
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Erreur lors de la requête à Claude via OpenRouter:', error?.response?.data || error);
    return "Désolé, je n'ai pas pu obtenir une réponse de l'IA pour le moment.";
  }
}

// Fonction de test simple
export async function testClaudeConnection() {
  const testPrompt = "Dis-moi bonjour en français et donne-moi un conseil de trading court.";
  const result = await askClaude(testPrompt);
  console.log("Réponse de Claude:", result);
  return result;
}

if (require.main === module) {
  testClaudeConnection().then(result => {
    console.log('Réponse IA :', result);
    process.exit(0);
  });
} 