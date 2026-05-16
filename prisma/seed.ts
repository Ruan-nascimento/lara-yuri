import { PrismaClient } from '@prisma/client';
import guests from '../lib/guests.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  for (const name of guests) {
    const existingGuest = await prisma.guest.findFirst({
      where: { name }
    });

    if (!existingGuest) {
      const guest = await prisma.guest.create({
        data: {
          name,
          confirmed: false,
        },
      });
      console.log(`Created guest with id: ${guest.id} and name: ${guest.name}`);
    } else {
      console.log(`Guest ${name} already exists.`);
    }
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
