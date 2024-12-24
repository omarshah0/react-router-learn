import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Delete existing records
  await prisma.user.deleteMany()

  // Create users
  const users = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    },
    {
      email: 'bob.wilson@example.com',
      name: 'Bob Wilson',
    },
    {
      email: 'alice.johnson@example.com',
      name: 'Alice Johnson',
    },
    {
      email: 'charlie.brown@example.com',
      name: 'Charlie Brown',
    },
  ]

  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }

  console.log('Database seeded successfully')
}

seed()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
