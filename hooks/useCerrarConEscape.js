'use client';
import { useEffect } from 'react';

export function useCerrarConEscape(activo, onCerrar) {
  useEffect(() => {
    if (!activo) return;
    function manejarTecla(e) {
      if (e.key === 'Escape') onCerrar();
    }
    document.addEventListener('keydown', manejarTecla);
    return () => document.removeEventListener('keydown', manejarTecla);
  }, [activo, onCerrar]);
}
