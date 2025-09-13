import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Token faltante" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, newRole } = body;

    if (!userId || !newRole) {
      return NextResponse.json({ message: "Parámetros faltantes" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("usuariosdb");
    const usersCollection = db.collection("users");

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole } },
      { returnDocument: "after" }
    );

    if (!result?.value) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user: result.value });
  } catch (error) {
    console.error("Error POST /admin/rol:", error);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}