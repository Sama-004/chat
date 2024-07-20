import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter you email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              username: existingUser.username,
              email: existingUser.email,
            };
          }
          return null;
        }
        try {
          const user = await prisma.user.create({
            data: {
              email: credentials.email as string,
              password: hashedPassword,
              username: "test",
              name: "testing",
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
          };
        } catch (err) {
          console.error(err);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    pages: {
      signIn: "/signin",
    },
  },
};
