import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { env } from "process";
import { loginSchema } from "~/validation/auth";
import { db } from "../db";

export const authConfig: NextAuthConfig = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  secret: env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const cred = await loginSchema.parseAsync(credentials);
        const user = await db.user.findUnique({ where: { email: cred.email } });

        if (!user) {
          return null;
        }

        const isValidPassword = bcrypt.compareSync(cred.password, user.password);

        if (!isValidPassword) {
          return null;
        }

        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
};
