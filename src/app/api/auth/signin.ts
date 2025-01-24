import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '@/libs/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password
    const isCorrectPassword = await bcrypt.compare(password, user.password as string);

    if (!isCorrectPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Remove the password from the user object
    const { password: _, ...userWithoutPassword } = user;

    // Respond with user details
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error in sign-in handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
