// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.delivery.deleteMany()
  await prisma.category.deleteMany()
  await prisma.driver.deleteMany()
  await prisma.company.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
      isApproved: true,
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Standard Delivery',
        description: 'Regular delivery service',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Express Delivery',
        description: 'Same-day delivery service',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Heavy Cargo',
        description: 'For items over 100kg',
      },
    }),
  ])

  // Create a company
  const companyUser = await prisma.user.create({
    data: {
      email: 'company@example.com',
      password: await bcrypt.hash('company123', 10),
      role: 'COMPANY',
      isApproved: true,
    },
  })

  const company = await prisma.company.create({
    data: {
      userId: companyUser.id,
      name: 'Express Logistics',
      address: '123 Delivery St',
    },
  })

  // Create drivers
  const driver1User = await prisma.user.create({
    data: {
      email: 'driver1@example.com',
      password: await bcrypt.hash('driver123', 10),
      role: 'DRIVER',
      isApproved: true,
    },
  })

  const driver1 = await prisma.driver.create({
    data: {
      userId: driver1User.id,
      companyId: company.id,
      license: 'DL123456',
      vehicle: 'Toyota Van',
    },
  })

  // Create customers
  const customer1User = await prisma.user.create({
    data: {
      email: 'customer1@example.com',
      password: await bcrypt.hash('customer123', 10),
      role: 'CUSTOMER',
      isApproved: true,
    },
  })

  const customer1 = await prisma.customer.create({
    data: {
      userId: customer1User.id,
      address: '456 Customer Ave',
    },
  })

  // Create sample deliveries
  const delivery1 = await prisma.delivery.create({
    data: {
      customerId: customer1User.id,
      driverId: driver1.id,
      categoryId: categories[0].id,
      status: 'DELIVERED',
      pickupAddr: '789 Pickup Rd',
      dropoffAddr: '101 Dropoff Ln',
      price: 25.99,
      distance: 10.5,
    },
  })

  // Create sample review
  await prisma.review.create({
    data: {
      deliveryId: delivery1.id,
      userId: customer1User.id,
      driverId: driver1.id,
      rating: 5,
      comment: 'Excellent service!',
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })