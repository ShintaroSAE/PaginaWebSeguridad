import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "WARFRAME POSTS",
  description: "Comparte tu viaje Tenno",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans bg-gray-700 text-gray-900">
        <header className="bg-gray-400 shadow-md p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-blue-700">
            WARFRAME POSTS
          </Link>
          <nav className="space-x-4">
            <Link href="/registro" className="hover:text-blue-900 font-bold text-black">
              Registro
            </Link>
            <Link href="/login" className="hover:text-blue-900 font-bold text-black">
              Login
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}