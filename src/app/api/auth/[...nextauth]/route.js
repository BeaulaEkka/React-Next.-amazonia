import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         // email: { label: "Email", type: "email", placeholder: "jsmith@abc.com" },
//         // password: { label: "Password", type: "password" },
//       },
//       //check to see if email and password is valid
//       async authorize(credentials) {
//         const { name, email, password } = credentials;

//         if (!credentials.email || !credentials.password) {
//           return null;
//         }
//         //check to see if user exists
//         const user = await prisma.user.findUnique({
//           where: {
//             email: user.email,
//           },
//         });
//         if (!user) {
//           return null;
//         }
//         //check to see if password is valid matched
//         const passwordsMatch = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );
//         if (!passwordsMatch) {
//           return null;
//         }
//         //return user object if everything is valid
//         return user;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
// };
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
