import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import bcrypt from 'bcryptjs';

// POST method to create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, phone, role } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        role,
        isApproved: role === 'CUSTOMER',
      },
    });

    return NextResponse.json({ user: { ...user, password: undefined } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET method to fetch all users
export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT method to update a user's details
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, email, phone, role } = body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
        phone,
        role,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE method to remove a user
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const user = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
