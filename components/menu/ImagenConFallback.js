'use client';
import { useState } from 'react';

export default function ImagenConFallback({ src, alt, emoji, className }) {
  const [fallo, setFallo] = useState(!src);

  if (fallo) {
    return <div className={`flex items-center justify-center bg-isabelline ${className}`}>{emoji ?? '🍽️'}</div>;
  }

  return <img src={src} alt={alt} className={className} onError={() => setFallo(true)} />;
}
