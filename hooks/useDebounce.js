'use client';
import { useEffect, useState } from 'react';

export function useDebounce(valor, delayMs = 300) {
  const [valorDebounced, setValorDebounced] = useState(valor);
  useEffect(() => {
    const id = setTimeout(() => setValorDebounced(valor), delayMs);
    return () => clearTimeout(id);
  }, [valor, delayMs]);
  return valorDebounced;
}
