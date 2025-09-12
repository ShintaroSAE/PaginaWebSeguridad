import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("usuariosdb");
    const users = db.collection("usuarios");

    const { correo, contraseña } = await req.json();

    if (!correo || !contraseña) {
      return NextResponse.json(
        { message: "Correo y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    const user = await users.findOne({ correo, contraseña });

    if (!user) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el login" },
      { status: 500 }
    );
  }
}
