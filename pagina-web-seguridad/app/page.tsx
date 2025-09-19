export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-blue-900">
      <section className="text-center max-w-2xl p-6">
        <h1 className="text-5xl font-extrabold text-blue-500 ">
          WARFRAME POSTS
        </h1>

        <div className="mt-6 flex gap-4 justify-center">
          <a
            href="/registro"
            className="px-6 py-3 rounded-2xl bg-violet-900 text-white font-semibold hover:bg-blue-700 transition"
          >
            Registrarse
          </a>
          <a
            href="/login"
            className="px-6 py-3 rounded-2xl bg-blue-700 text-white font-semibold hover:bg-blue-950 transition"
          >
            Iniciar sesión
          </a>
        </div>
      </section>
    </main>
  );
}