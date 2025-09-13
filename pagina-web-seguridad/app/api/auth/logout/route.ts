import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({ message: "Sesión cerrada" }, { status: 200 });
  } catch (error) {
    console.error("Error en logout:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}