import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await connectMongoDB();
//     await User.create({ name, email, password: hashedPassword });
//     console.log("User", User);

//     return NextResponse.json({ message: "User registered." }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occured while registering the user. Try again." },
//       { status: 500 }
//     );
//   }
// }

// api/register.js

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const { name, email, password } = req.body;

      // Check if the user already exists
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the user's password (use a secure hashing library)
      const hashedPassword = await bcrypt.hashPassword(password);

      // Create a new user document and save it to the database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Registration successful
      return res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ error: "User registration failed" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
