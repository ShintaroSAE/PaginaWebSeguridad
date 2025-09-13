"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-10">Pagina Web</h1>

      <div className="flex space-x-6">
        <Link href="/registro">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition">
            Registro
          </button>
        </Link>

        <Link href="/login">
          <button className="px-6 py-3 bg-white text-green-600 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition">
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </div>
  );
}