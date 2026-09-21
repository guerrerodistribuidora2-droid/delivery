'use client';
import { useEffect } from 'react';

export function useCerrarAlClickAfuera(ref, activo, onCerrar) {
  useEffect(() => {
    if (!activo) return;
    function manejarClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onCerrar();
    }
    document.addEventListener('mousedown', manejarClick);
    return () => document.removeEventListener('mousedown', manejarClick);
  }, [ref, activo, onCerrar]);
}
