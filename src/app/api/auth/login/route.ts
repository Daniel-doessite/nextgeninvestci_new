import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: Implémenter la logique d'authentification réelle
    // Pour l'instant, on simule une authentification
    if (email && password) {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          email: email,
          name: 'Utilisateur Test'
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Identifiants invalides' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 