'use client';
import { useRef } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCarrito } from './CarritoContext';
import { linkWhatsapp, obtenerNumeroRestaurante } from '@/utils/whatsapp';
import { useCerrarConEscape } from '@/hooks/useCerrarConEscape';
import ImagenConFallback from '@/components/menu/ImagenConFallback';

export default function CarritoDrawer() {
  const { items, cambiarCantidad, quitarProducto, subtotal, abierto, setAbierto } = useCarrito();
  const drawerRef = useRef(null);
  const numeroRestaurante = obtenerNumeroRestaurante();

  function cerrar() {
    setAbierto(false);
  }

  useCerrarConEscape(abierto, cerrar);

  function generarMensajePedido() {
    const lineas = items.map(
      (i) => `• ${i.cantidad}x ${i.producto.nombre} — $${(Number(i.producto.precio) * i.cantidad).toFixed(2)}`
    );
    return ['¡Hola! 👋 Quiero hacer este pedido:', '', ...lineas, '', `*Total: $${subtotal.toFixed(2)}*`].join('\n');
  }

  function completarPedido() {
    if (items.length === 0 || !numeroRestaurante) return;
    window.open(linkWhatsapp(numeroRestaurante, generarMensajePedido()), '_blank', 'noopener,noreferrer');
  }

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button aria-label="Cerrar carrito" onClick={cerrar} className="absolute inset-0 bg-black/40" />

      <div ref={drawerRef} className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gainsboro px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-rich-black">Tu pedido</h2>
          <button onClick={cerrar} className="rounded-full p-2 text-spanish-gray hover:bg-cultured" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-spanish-gray">
              <ShoppingBag className="h-10 w-10" />
              <p className="text-sm">Tu carrito está vacío.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ producto, cantidad }) => (
                <li key={producto.id} className="flex items-center gap-3 rounded-xl border border-cultured p-3">
                  <ImagenConFallback
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    emoji={producto.emoji}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover text-2xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-rich-black">{producto.nombre}</p>
                    <p className="text-xs text-spanish-gray">${Number(producto.precio).toFixed(2)} c/u</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => cambiarCantidad(producto.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gainsboro hover:bg-cultured" aria-label="Restar">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{cantidad}</span>
                    <button onClick={() => cambiarCantidad(producto.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gainsboro hover:bg-cultured" aria-label="Sumar">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button onClick={() => quitarProducto(producto.id)} className="rounded-full p-1.5 text-spanish-gray hover:bg-red-50 hover:text-cinnabar" aria-label="Quitar">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-gainsboro px-5 py-4">
            <div className="flex justify-between text-base font-bold text-rich-black">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={completarPedido}
              disabled={!numeroRestaurante}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MessageCircle className="h-4 w-4" />
              {numeroRestaurante ? 'Completar pedido por WhatsApp' : 'Número no configurado'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
