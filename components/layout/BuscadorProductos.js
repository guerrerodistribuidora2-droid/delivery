'use client';
import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useBusquedaProductos } from '@/hooks/useBusquedaProductos';
import { useCarrito } from '@/components/carrito/CarritoContext';
import ImagenConFallback from '@/components/menu/ImagenConFallback';

export default function BuscadorProductos({ onSeleccionar }) {
  const [consulta, setConsulta] = useState('');
  const { resultados, cargando, hayConsulta, origen } = useBusquedaProductos(consulta);
  const { agregarProducto } = useCarrito();

  function manejarSeleccion(producto) {
    agregarProducto(producto); // agrega + abre el drawer automáticamente
    setConsulta('');
    onSeleccionar?.();
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="flex items-center rounded-full border border-gainsboro bg-white px-4 py-2">
        <Search className="mr-2 h-4 w-4 shrink-0 text-spanish-gray" />
        <input
          type="text"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder="Busca tu plato favorito..."
          className="w-full bg-transparent text-sm text-rich-black outline-none placeholder:text-spanish-gray"
          autoFocus
        />
        {cargando && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-spanish-gray" />}
      </div>

      {hayConsulta && (
        <ul className="mt-2 max-h-72 overflow-y-auto rounded-2xl border border-gainsboro bg-white shadow-card-1">
          {resultados.length === 0 && !cargando ? (
            <li className="px-4 py-3 text-sm text-spanish-gray">Sin resultados para &quot;{consulta}&quot;.</li>
          ) : (
            resultados.map((producto) => (
              <li key={producto.id}>
                <button
                  onClick={() => manejarSeleccion(producto)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-isabelline"
                >
                  <ImagenConFallback
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    emoji={producto.emoji}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover text-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-rich-black">{producto.nombre}</p>
                    <p className="text-xs text-spanish-gray">{producto.categoria}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-deep-saffron">${producto.precio.toFixed(2)}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {origen === 'mock' && hayConsulta && (
        <p className="mt-1.5 px-1 text-[11px] text-spanish-gray">
          Mostrando datos de prueba locales (Supabase no está conectado todavía).
        </p>
      )}
    </div>
  );
}
