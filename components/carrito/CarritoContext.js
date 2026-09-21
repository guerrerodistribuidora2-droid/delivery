'use client';
import { createContext, useContext, useMemo, useState } from 'react';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]); // [{ producto, cantidad }]
  const [abierto, setAbierto] = useState(false);

  function agregarProducto(producto) {
    setItems((prev) => {
      const existe = prev.find((i) => i.producto.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
    setAbierto(true); // feedback inmediato: agregar abre el carrito
  }

  function cambiarCantidad(productoId, delta) {
    setItems((prev) =>
      prev
        .map((i) => (i.producto.id === productoId ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0)
    );
  }

  function quitarProducto(productoId) {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
  }

  function vaciarCarrito() {
    setItems([]);
  }

  // Number(...) defensivo: protege contra `precio` llegando como string
  // (así devuelve Postgres las columnas `numeric` vía PostgREST).
  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + Number(i.producto.precio) * i.cantidad, 0),
    [items]
  );
  const cantidadTotal = useMemo(() => items.reduce((acc, i) => acc + i.cantidad, 0), [items]);

  const value = {
    items, agregarProducto, cambiarCantidad, quitarProducto, vaciarCarrito,
    subtotal, cantidadTotal, abierto, setAbierto,
  };

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  return ctx;
}
