import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function DELETE(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ message: "ID de usuario faltante" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("usuariosdb");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error DELETE /admin/delete:", error);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}