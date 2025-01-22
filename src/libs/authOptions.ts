import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile(profile) {
        // Create or update user when signing in with GitHub
        const user = await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          update: {},
          create: {
            email: profile.email,
            role: 'CUSTOMER', // Default role for OAuth users
            isApproved: true, // Auto-approve OAuth users
          },
        });
        
        return {
          ...profile,
          id: user.id,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        // Create or update user when signing in with Google
        const user = await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          update: {},
          create: {
            email: profile.email,
            role: 'CUSTOMER', // Default role for OAuth users
            isApproved: true, // Auto-approve OAuth users
          },
        });
        
        return {
          ...profile,
          id: user.id,
          role: user.role,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (!user.password) {
          throw new Error('Please login with OAuth provider');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        if (!user.isApproved && ['COMPANY', 'DRIVER'].includes(user.role)) {
          throw new Error('Your account is pending approval');
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token)
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        url = `${baseUrl}${url}`;
      }
      if (!url.startsWith('http')) {
        url = `${baseUrl}${url}`;
      }
      return url;
    },
  },
  session: {
    strategy: "jwt",
  },
};