'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User } from 'lucide-react';
import BotonCarritoFlotante from '@/components/carrito/BotonCarritoFlotante';
import BuscadorProductos from './BuscadorProductos';
import { useCerrarConEscape } from '@/hooks/useCerrarConEscape';
import { useCerrarAlClickAfuera } from '@/hooks/useCerrarAlClickAfuera';

const NAV_LINKS = [
  ['#home', 'Inicio'],
  ['#about', 'Nosotros'],
  ['#food-menu', 'Menú'],
];

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const menuRef = useRef(null);
  const buscadorRef = useRef(null);

  function abrirMenu() {
    setMenuAbierto(true);
    setBuscadorAbierto(false); // exclusión mutua: uno cierra al otro
  }
  function abrirBuscador() {
    setBuscadorAbierto(true);
    setMenuAbierto(false);
  }

  useCerrarConEscape(menuAbierto || buscadorAbierto, () => {
    setMenuAbierto(false);
    setBuscadorAbierto(false);
  });
  useCerrarAlClickAfuera(menuRef, menuAbierto, () => setMenuAbierto(false));
  useCerrarAlClickAfuera(buscadorRef, buscadorAbierto, () => setBuscadorAbierto(false));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-card-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-3xl font-bold text-rich-black">
          Foodie<span className="text-deep-saffron">.</span>
        </Link>

        <nav className="hidden items-center gap-8 font-heading text-sm font-medium text-onyx md:flex">
          {NAV_LINKS.map(([href, texto]) => (
            <Link key={href} href={href} className="transition hover:text-deep-saffron">
              {texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => (buscadorAbierto ? setBuscadorAbierto(false) : abrirBuscador())}
            className="rounded-full p-2 transition hover:bg-cultured"
            aria-label="Buscar"
            aria-expanded={buscadorAbierto}
            aria-controls="buscador-panel"
          >
            <Search className="h-5 w-5 text-rich-black" />
          </button>

          <BotonCarritoFlotante />

          <button className="hidden rounded-full p-2 transition hover:bg-cultured sm:flex" aria-label="Perfil de usuario">
            <User className="h-5 w-5 text-rich-black" />
          </button>

          <button
            onClick={() => (menuAbierto ? setMenuAbierto(false) : abrirMenu())}
            className="rounded-full p-2 transition hover:bg-cultured md:hidden"
            aria-label="Menú"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil-panel"
          >
            {menuAbierto ? <X className="h-6 w-6 text-rich-black" /> : <Menu className="h-6 w-6 text-rich-black" />}
          </button>
        </div>
      </div>

      {buscadorAbierto && (
        <div id="buscador-panel" ref={buscadorRef} className="border-t border-gainsboro bg-isabelline px-4 py-3">
          <BuscadorProductos onSeleccionar={() => setBuscadorAbierto(false)} />
        </div>
      )}

      {menuAbierto && (
        <nav id="menu-movil-panel" ref={menuRef} className="border-t border-gainsboro bg-white px-6 py-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-4 font-heading text-base font-medium text-onyx">
            {NAV_LINKS.map(([href, texto]) => (
              <li key={href}>
                <Link href={href} onClick={() => setMenuAbierto(false)} className="block hover:text-deep-saffron">
                  {texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
