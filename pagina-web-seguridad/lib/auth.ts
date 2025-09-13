export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function getUserRole(): "user" | "admin" | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    await fetch("/logout", { method: "POST" }); // llama al backend
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  } finally {
    localStorage.removeItem("token"); // limpia el token
    window.location.href = "/login";  // redirige al login
  }
}