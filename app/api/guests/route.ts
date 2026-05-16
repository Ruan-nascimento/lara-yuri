import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(guests);
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json({ error: 'Erro ao buscar convidados' }, { status: 500 });
  }
}
