"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import { logout } from "@/lib/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error cargando usuario:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-700 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">
          PERFIL DE USUARIO
        </h1>
        <button
          onClick={logout}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow hover:bg-violet-950 transition"
        >
          Cerrar sesión
        </button>
      </div>

      {user ? (
        <div className="grid md:grid-cols-1 gap-50">
          {/* Perfil */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-950 text-white flex items-center justify-center text-2xl font-bold">
                {user.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-x1 font-semibold text-gray-700">
                  {user.nombre}
                </p>
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="px-3 py-1 rounded text-sm font-medium bg-violet-300 text-black">
                Rol: {user.role}
              </span>
            </div>
          </div> 
        </div>
      ) : (
        <p>No se pudieron cargar los datos del usuario.</p>
      )}
    </div>
  );
}