'use client';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PRODUCTOS_MOCK } from '@/lib/mockProductos';
import { useDebounce } from './useDebounce';

function buscarEnMock(consulta) {
  const q = consulta.toLowerCase();
  return PRODUCTOS_MOCK
    .filter((p) => p.disponible)
    .filter((p) => p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q))
    .slice(0, 8);
}

export function useBusquedaProductos(consulta) {
  const consultaDebounced = useDebounce(consulta.trim(), 300);
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [origen, setOrigen] = useState('mock'); // 'supabase' | 'mock' — para el aviso discreto en UI
  const idPeticionRef = useRef(0); // descarta respuestas de búsquedas obsoletas (condición de carrera)

  useEffect(() => {
    if (!consultaDebounced) {
      setResultados([]);
      setCargando(false);
      return;
    }

    // Caso 1: Supabase ni siquiera está configurado — directo al mock, sin red.
    if (!supabase) {
      setResultados(buscarEnMock(consultaDebounced));
      setOrigen('mock');
      return;
    }

    const idActual = ++idPeticionRef.current;
    setCargando(true);

    // '(' ',' ')' tienen significado especial en la sintaxis .or() de PostgREST
    const consultaSegura = consultaDebounced.replace(/[(),]/g, '');

    supabase
      .from('productos')
      .select('*')
      .eq('disponible', true)
      .or(`nombre.ilike.%${consultaSegura}%,categoria.ilike.%${consultaSegura}%`)
      .limit(8)
      .then(({ data, error }) => {
        if (idActual !== idPeticionRef.current) return; // ya hay una búsqueda más nueva en curso

        // Caso 2: Supabase configurado pero la consulta falló (tabla
        // inexistente, RLS, red caída) — no se rompe la búsqueda, cae al mock.
        if (error || !data) {
          setResultados(buscarEnMock(consultaDebounced));
          setOrigen('mock');
          setCargando(false);
          return;
        }

        // `numeric` de Postgres llega como string vía PostgREST — se
        // normaliza a number una sola vez acá.
        const normalizados = data.map((p) => ({
          ...p,
          precio: Number(p.precio),
          precio_original: p.precio_original ? Number(p.precio_original) : null,
        }));

        setResultados(normalizados);
        setOrigen('supabase');
        setCargando(false);
      });
  }, [consultaDebounced]);

  return { resultados, cargando, hayConsulta: consultaDebounced.length > 0, origen };
}
