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
        <header className="bg-gray-300 shadow-md p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold  text-blue-600">
            WARFRAME POSTS
          </Link>
          <nav className="space-x-4">
            <Link href="/registro" className="hover:text-blue-900 text-gray-600">
              Registro
            </Link>
            <Link href="/login" className="hover:text-blue-900 text-gray-600">
              Login
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}