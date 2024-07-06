import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.currency.createMany({
    data: [
      {
        code: 'usd',
        name: 'US Dollar',
        symbol: '$',
      },
      {
        code: 'eur',
        name: 'Euro',
        symbol: '€',
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
