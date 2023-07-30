import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let username: string;
        if (!user.username) {
          if (user.name) {
            username = user.name?.replaceAll(" ", ".").toLocaleLowerCase();
          } else {
            username = user.email?.split("@")[0]!;
          }

          await prisma.user.update({
            data: {
              username: username,
            },
            where: {
              email: user?.email!,
            },
          });
        } else {
          username = user.username;
        }

        token.username = username;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username;
      }

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const isExists = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!isExists) {
          return null;
        }

        if (credentials?.password) {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });

          const isPasswordValid = user?.password === credentials?.password;

          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              username: user.username,
              image: user.image,
            };
          }
        }

        return null;
      },
    }),
  ],
};
