
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import { logout } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar info del admin
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();

        if (data.user.role !== "admin") {
          router.push("/dashboard");
          return;
        }

        setUser(data.user as User);
      } catch (error) {
        console.error("Error cargando usuario:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  // Cargar lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Cambiar rol de un usuario
  const toggleRole = async (userId: string, currentRole: "user" | "admin") => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/admin/rol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          newRole: currentRole === "admin" ? "user" : "admin",
        }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId
              ? { ...u, role: currentRole === "admin" ? "user" : "admin" }
              : u
          )
        );
      }
    } catch (error) {
      console.error("Error cambiando rol:", error);
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
      const res = await fetch(`/api/admin/delete?id=${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <div className="p-8 bg-gray-500 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Panel de Administración
        </h1>
        <button
          onClick={logout}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Admin Info */}
      {user && (
        <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Información del Administrador
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-600">
            <p>
              <strong>Nombre:</strong> {user.nombre}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Rol:</strong>{" "}
              <span className="text-green-600 font-medium">{user.role}</span>
            </p>
          </div>
        </div>
      )}

      {/* Tabla de usuarios */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Usuarios registrados
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 text-black">{u.nombre}</td>
                <td className="p-3 text-black">{u.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      u.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => toggleRole(u._id, u.role)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Cambiar rol
                  </button>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
