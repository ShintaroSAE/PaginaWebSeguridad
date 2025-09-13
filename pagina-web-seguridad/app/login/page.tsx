"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar token y rol
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        // Redirigir según rol
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 text-gray-900 placeholder-gray-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 text-gray-900 placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700"
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}