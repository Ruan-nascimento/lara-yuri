import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Nome inválido.' }, { status: 400 });
    }

    const inputName = name.trim();

    const existingGuest = await prisma.guest.findFirst({
      where: { 
        name: {
          equals: inputName,
          mode: 'insensitive'
        }
      }
    });

    if (!existingGuest) {
      return NextResponse.json(
        { error: 'Desculpe, não encontramos seu nome na lista. Verifique a ortografia ou selecione na lista.' }, 
        { status: 404 }
      );
    }

    if (existingGuest.confirmed) {
      return NextResponse.json({ message: `Sua presença já estava confirmada, ${existingGuest.name}!` });
    }

    await prisma.guest.update({
      where: { id: existingGuest.id },
      data: { confirmed: true }
    });

    return NextResponse.json({ message: `Presença confirmada para ${existingGuest.name}! Muito obrigado.` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ocorreu um erro ao confirmar presença.' }, { status: 500 });
  }
}
