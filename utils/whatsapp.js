export function linkWhatsapp(numero, mensaje) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export function obtenerNumeroRestaurante() {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO;
  if (!numero && process.env.NODE_ENV !== 'production') {
    console.warn('Falta NEXT_PUBLIC_WHATSAPP_NUMERO en .env.local');
  }
  return numero ?? '';
}
