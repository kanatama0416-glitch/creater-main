import { useMemo, useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

function buildCandidates(src: string): string[] {
  const dotIndex = src.lastIndexOf('.');
  if (dotIndex === -1) return [src];

  const base = src.slice(0, dotIndex);
  const originalExt = src.slice(dotIndex).toLowerCase();
  const fallbackExts = extensions.filter((ext) => ext !== originalExt);

  return [src, ...fallbackExts.map((ext) => `${base}${ext}`)];
}

export function SmartImage({ src, alt, className }: SmartImageProps) {
  const candidates = useMemo(() => buildCandidates(src), [src]);
  const [candidateIndex, setCandidateIndex] = useState(0);

  const nextSrc = candidates[candidateIndex] ?? src;

  return (
    <img
      src={nextSrc}
      alt={alt}
      className={className}
      onError={() => {
        setCandidateIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : prev));
      }}
    />
  );
}
