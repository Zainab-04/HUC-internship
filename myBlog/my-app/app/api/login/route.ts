import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Dummy login check
  if (email === "test@gmail.com" && password === "1234") {
    return NextResponse.json({
      user: { _id: "123", email }
    });
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}