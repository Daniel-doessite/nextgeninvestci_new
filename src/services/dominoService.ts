import axios from 'axios';

const DOMINO_API_KEY = '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';
const DOMINO_API_URL = 'https://api.domino.ai/v1/chat/completions';

export async function askDomino(message: string): Promise<string> {
  try {
    const response = await axios.post(
      DOMINO_API_URL,
      {
        model: 'domino-3',
        messages: [
          { role: 'user', content: message }
        ],
        max_tokens: 512,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${DOMINO_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Erreur lors de la requête à Domino:', error?.response?.data || error);
    return "Désolé, je n'ai pas pu obtenir une réponse pour le moment. Veuillez réessayer.";
  }
}

// Fonction de test
export async function testDominoConnection() {
  const testPrompt = "Dis-moi bonjour et donne-moi un conseil de trading court.";
  const result = await askDomino(testPrompt);
  console.log("Réponse de Domino:", result);
  return result;
} 