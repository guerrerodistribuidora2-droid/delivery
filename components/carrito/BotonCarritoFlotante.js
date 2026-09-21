'use client';
import { ShoppingCart } from 'lucide-react';
import { useCarrito } from './CarritoContext';

export default function BotonCarritoFlotante() {
  const { cantidadTotal, setAbierto } = useCarrito();

  return (
    <button onClick={() => setAbierto(true)} className="relative rounded-full p-2 transition hover:bg-cultured" aria-label="Ver carrito">
      <ShoppingCart className="h-5 w-5 text-rich-black" />
      {cantidadTotal > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cinnabar text-[10px] font-bold text-white">
          {cantidadTotal}
        </span>
      )}
    </button>
  );
}
