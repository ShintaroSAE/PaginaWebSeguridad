import "dotenvdotlocal/config";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/db";

async function seedAdmin() {
  try {
    const client = await clientPromise;
    const db = client.db("talleresdb");
    const users = db.collection("users");

    // Verificar si ya existe el admin
    const existing = await users.findOne({ email: "admin@pagina.com" });
    if (existing) {
      console.log("Admin ya existe en la BD");
      return;
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash("12345", 10);

    // Insertar admin
    await users.insertOne({
      nombre: "Admin",
      email: "admin@pagina.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin creado con éxito: admin@pagina.com / 12345");
  } catch (err) {
    console.error("Error al crear admin:", err);
  } finally {
    process.exit();
  }
}

seedAdmin();