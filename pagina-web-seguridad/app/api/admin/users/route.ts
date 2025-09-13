import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/db";

// Definimos la interfaz de nuestro payload de JWT
interface JwtPayload {
  email: string;
  nombre: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Token faltante" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) throw new Error("JWT_SECRET no definido");

    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, SECRET) as JwtPayload;
    } catch {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    if (payload.role !== "admin") {
      return NextResponse.json({ message: "Acceso no autorizado" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db("usuariosdb");
    const usersCollection = db.collection("users");

    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .toArray();

    return NextResponse.json({ users });
  } catch (err) {
    console.error("Error obteniendo usuarios:", err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}