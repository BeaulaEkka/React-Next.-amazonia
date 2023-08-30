import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user. Try again." },
      { status: 500 }
    );
  }

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   signUp("credentials");
  // };
  // const body = await credentials.json();
  // const { name, email, password, reEnterPassword } = body.data;
  // console.log("body api/register/route", body.data);

  // if (!name || !email || !password || !reEnterPassword) {
  //   return new NextResponse("Missing name, email, or password", {
  //     status: 400,
  //   });
  // }
  // const exist = await prisma.credentials.findUnique({
  //   where: {
  //     email: credentials.email,
  //   },
  // });
  // if (exist) {
  //   return new NextResponse("User already exists", { status: 400 });
  // }
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const user = await prisma.user.create({
  //   data: {
  //     email,
  //     hashedPassword,
  //   },
  // });
  // return NextResponse.json(user);
}
