import NextAuth from "next-auth";
import CredentialsProdiver from "next-auth/providers/credentials";

import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbConnect";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProdiver({
        async authorize(credentials, req) {
          dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Helytelen email cím, vagy jelszó!");
          }
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            throw new Error("Helytelen email cím, vagy jelszó!");
          }
          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;
        delete session?.user?.password;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
