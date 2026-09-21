import { Shadows_Into_Light, Roboto, Rubik } from 'next/font/google';
import './globals.css';
import { CarritoProvider } from '@/components/carrito/CarritoContext';
import Header from '@/components/layout/Header';
import CarritoDrawer from '@/components/carrito/CarritoDrawer';

const shadowsIntoLight = Shadows_Into_Light({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' });
const rubik = Rubik({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-heading' });

export const metadata = {
  title: 'Foodie — Comida rápida a un clic',
  description: 'Pide tus hamburguesas, pizzas y antojos favoritos, directo a tu puerta por WhatsApp.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${shadowsIntoLight.variable} ${roboto.variable} ${rubik.variable}`}>
      {/* suppressHydrationWarning: solo cubre los atributos propios de <body> —
          es el fix oficial de Next.js para warnings falsos que inyectan
          extensiones del navegador (Grammarly, gestores de contraseñas, etc.)
          antes de que React hidrate. No oculta mismatches reales de contenido. */}
      <body className="bg-isabelline font-body text-rich-black antialiased" suppressHydrationWarning>
        <CarritoProvider>
          <Header />
          <main>{children}</main>
          <CarritoDrawer />
        </CarritoProvider>
      </body>
    </html>
  );
}
