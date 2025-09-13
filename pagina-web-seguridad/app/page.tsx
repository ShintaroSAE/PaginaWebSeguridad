export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-blue-900">
      <section className="text-center max-w-2xl p-6">
        <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow-sm">
          WARFRAME POSTS
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Comparte tu viaje aqui Tenno
        </p>
        <p className="mt-4 text-lg text-gray-700">
          Hecho por{" "}
          <span className="font-semibold text-blue-600 drop-shadow-sm">Eduardo Salazar Aguilar</span>.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <a
            href="/registro"
            className="px-6 py-3 rounded-2xl bg-violet-800 text-white font-semibold hover:bg-blue-700 transition"
          >
            Registrarse
          </a>
          <a
            href="/login"
            className="px-6 py-3 rounded-2xl bg-gray-600 text-white font-semibold hover:bg-blue-950 transition"
          >
            Iniciar sesión
          </a>
        </div>
      </section>
    </main>
  );
}