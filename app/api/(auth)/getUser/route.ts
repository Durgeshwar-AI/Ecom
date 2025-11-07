import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/db";
import User from "@/models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token missing" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    interface VerifiedPayload {
      id?: string;
      userId?: string;
      _id?: string;
      email?: string;
    }

    let payload: VerifiedPayload;
    try {
      payload = jwt.verify(token, JWT_SECRET) as VerifiedPayload;
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const userId = payload.id || payload.userId || payload._id;
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    // Find user by ID and select only userName and email
    const user = await User.findById(userId).select("userName email");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return only the essential info
    return NextResponse.json(
      {
        user: {
          userName: user.userName,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
