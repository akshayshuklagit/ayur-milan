const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed Admin
  const adminUser = process.env.DEFAULT_ADMIN_USER || 'admin';
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'ayurmilan2026';
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUser }
  });

  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    await prisma.admin.create({
      data: {
        username: adminUser,
        password: hashedPassword
      }
    });
    console.log(`Admin created: ${adminUser} / ${adminPassword}`);
  } else {
    console.log(`Admin '${adminUser}' already exists. Skipping.`);
  }

  // 2. Seed Sample Coupons
  const sampleCoupons = [
    { code: 'WELCOME100', discountType: 'FIXED', value: 100 },
    { code: 'AYUR10', discountType: 'PERCENT', value: 10 }
  ];

  for (const coupon of sampleCoupons) {
    const existing = await prisma.coupon.findUnique({
      where: { code: coupon.code }
    });

    if (!existing) {
      await prisma.coupon.create({
        data: {
          code: coupon.code,
          discountType: coupon.discountType,
          value: coupon.value,
          isActive: true
        }
      });
      console.log(`Coupon created: ${coupon.code} (${coupon.discountType} - ${coupon.value})`);
    } else {
      console.log(`Coupon '${coupon.code}' already exists. Skipping.`);
    }
  }

  // 3. Seed Default Payment Config
  const existingConfig = await prisma.paymentConfig.findUnique({
    where: { id: 'default' }
  });

  if (!existingConfig) {
    await prisma.paymentConfig.create({
      data: {
        id: 'default',
        upiId: 'agniveshevents@upi',
        qrCodeUrl: '/assets/img/qr-code.png'
      }
    });
    console.log('Default PaymentConfig seeded: agniveshevents@upi');
  } else {
    console.log('PaymentConfig already exists. Skipping.');
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
