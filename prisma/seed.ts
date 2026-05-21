import { PrismaClient } from "@prisma/client";
import guests from "../lib/guests.json";

const prisma = new PrismaClient();

function normalizeGuests(list: string[]) {
  return Array.from(
    new Set(
      list
        .map((name) => name.trim())
        .filter(Boolean)
    )
  );
}

async function main() {
  const normalizedGuests = normalizeGuests(guests);

  console.log("Limpando lista antiga...");

  await prisma.guest.deleteMany();

  console.log(`Inserindo ${normalizedGuests.length} convidados...`);

  await prisma.guest.createMany({
    data: normalizedGuests.map((name) => ({
      name,
      confirmed: false,
    })),
  });

  console.log("Lista de convidados atualizada com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao atualizar convidados:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });