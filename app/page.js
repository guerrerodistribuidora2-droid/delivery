'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useCarrito } from '@/components/carrito/CarritoContext';
import { PRODUCTOS_MOCK } from '@/lib/mockProductos';
import ImagenConFallback from '@/components/menu/ImagenConFallback';

export default function Home() {
  const { agregarProducto } = useCarrito();
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  const categorias = useMemo(() => ['Todas', ...new Set(PRODUCTOS_MOCK.map((p) => p.categoria))], []);

  const platillosFiltrados = useMemo(() => {
    const disponibles = PRODUCTOS_MOCK.filter((p) => p.disponible);
    return categoriaActiva === 'Todas' ? disponibles : disponibles.filter((p) => p.categoria === categoriaActiva);
  }, [categoriaActiva]);

  return (
    <div className="flex min-h-screen flex-col bg-isabelline">
      {/* HERO */}
      <section id="home" className="relative overflow-hidden border-b border-gainsboro bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-gainsboro bg-isabelline px-4 py-1.5 text-xs font-semibold text-deep-saffron">
              <Star className="h-3.5 w-3.5 fill-deep-saffron" /> Sabor 100% artesanal y rápido
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-rich-black sm:text-5xl lg:text-6xl">
              Disfruta la mejor{' '}
              <span className="font-display text-5xl text-deep-saffron sm:text-6xl lg:text-7xl">comida rápida</span>{' '}
              en casa.
            </h1>
            <p className="mx-auto max-w-xl text-base text-spanish-gray sm:text-lg lg:mx-0">
              Pide tus hamburguesas, pizzas y antojos favoritos de forma instantánea. Directo a tu puerta y sin
              complicaciones mediante WhatsApp.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <a
                href="#food-menu"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-deep-saffron px-8 py-4 font-heading font-bold text-white shadow-lg transition hover:bg-amber-600 sm:w-auto"
              >
                Ver Menú Completo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="flex w-full items-center justify-center rounded-full border-2 border-gainsboro px-8 py-3.5 font-heading font-semibold text-rich-black transition hover:bg-cultured sm:w-auto"
              >
                Conócenos
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl border-4 border-white bg-cultured shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                alt="Plato destacado"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="about" className="bg-isabelline px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { icono: Clock, color: 'text-deep-saffron', titulo: 'Entrega Rápida', texto: 'Tus platillos llegan calientes y en el menor tiempo posible directo a tu ubicación.' },
            { icono: Star, color: 'text-cinnabar', titulo: 'Calidad Garantizada', texto: 'Ingredientes frescos y seleccionados diariamente para darte el mejor sabor.' },
            { icono: MapPin, color: 'text-emerald-600', titulo: 'Cobertura Amplia', texto: 'Llegamos a cada rincón de la ciudad listos para saciar tu apetito.' },
          ].map(({ icono: Icono, color, titulo, texto }) => (
            <div key={titulo} className="flex flex-col items-center rounded-3xl border border-gainsboro bg-white p-8 text-center shadow-card-1">
              <div className={`mb-4 rounded-2xl bg-isabelline p-4 ${color}`}>
                <Icono className="h-8 w-8" fill={color.includes('cinnabar') ? 'currentColor' : 'none'} />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-rich-black">{titulo}</h3>
              <p className="text-sm text-spanish-gray">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENÚ */}
      <section id="food-menu" className="border-t border-gainsboro bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="mb-3 font-display text-4xl font-bold text-rich-black sm:text-5xl">Nuestro Menú</h2>
            <p className="text-sm text-spanish-gray sm:text-base">
              Elige lo que más te guste, agrégalo al carrito con un clic y pídelo al instante.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaActiva(cat)}
                  className={`rounded-full px-5 py-2 font-heading text-xs font-semibold transition sm:text-sm ${
                    categoriaActiva === cat ? 'bg-deep-saffron text-white shadow-md' : 'bg-cultured text-onyx hover:bg-gainsboro'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {platillosFiltrados.map((producto) => (
              <div key={producto.id} className="group flex flex-col overflow-hidden rounded-3xl border border-gainsboro bg-white shadow-card-1 transition duration-300 hover:shadow-card-2">
                <div className="relative h-52 w-full overflow-hidden bg-cultured">
                  <ImagenConFallback
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    emoji={producto.emoji}
                    className="h-full w-full object-cover text-6xl transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-rich-black shadow-sm backdrop-blur-sm">
                    {producto.categoria}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-heading text-lg font-bold text-rich-black">{producto.nombre}</h3>
                      <span className="font-heading text-lg font-bold text-deep-saffron">${producto.precio.toFixed(2)}</span>
                    </div>
                    <p className="mb-4 line-clamp-2 text-xs text-spanish-gray sm:text-sm">{producto.descripcion}</p>
                  </div>

                  <button
                    onClick={() => agregarProducto(producto)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-rich-black py-3 font-heading text-xs font-bold text-white shadow-sm transition hover:bg-deep-saffron sm:text-sm"
                  >
                    <ShoppingBag className="h-4 w-4" /> Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gainsboro/10 bg-onyx px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <Link href="/" className="font-display text-3xl font-bold text-white">
              Foodie<span className="text-deep-saffron">.</span>
            </Link>
            <p className="mt-1 text-xs text-spanish-gray">El sabor que te acompaña todos los días.</p>
          </div>
          <p className="text-xs text-spanish-gray">© {new Date().getFullYear()} Foodie. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
