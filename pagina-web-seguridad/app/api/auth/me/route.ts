import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import clientPromise from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Token faltante" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET as string;

    if (!secret) throw new Error("JWT_SECRET no definido");

    const decoded = jwt.verify(token, secret) as JwtPayload;

    const client = await clientPromise;
    const db = client.db("usuariosdb");
    const users = db.collection("users");

    const user = await users.findOne(
      { email: decoded.email },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}