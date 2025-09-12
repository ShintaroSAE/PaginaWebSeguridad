import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("usuariosdb");       
    const users = db.collection("usuarios");  

    const { nombre, correo, contraseña } = await req.json();

    if (!nombre || !correo || !contraseña) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    await users.insertOne({ nombre, correo, contraseña });

    return NextResponse.json({ message: "Usuario registrado con exito" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}