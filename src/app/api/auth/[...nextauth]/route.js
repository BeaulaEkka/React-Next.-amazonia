import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../.././../models/user";
import { connectMongoDB } from "@/lib/mongodb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},

      //check to see if password is valid
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) {
            console.log(`User not found for email: ${email}`);
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            console.log(`Password does not match for user: ${email}`);
            return null;
          }
          return user;
        } catch (error) {
          console.error("Error during authentication: ", error);
          console.log("Error: ", error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
