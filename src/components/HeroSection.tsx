import { useEffect, useMemo, useRef, useState } from 'react';
import { localCardSlots } from '../lib/localCardSlots';
import { Card } from '../lib/supabase';
import { SmartImage } from './SmartImage';

interface HeroSectionProps {
  onCardClick: (card: Card) => void;
}

export function HeroSection({ onCardClick }: HeroSectionProps) {
  const stageRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const featuredCards = useMemo(() => {
    return [...localCardSlots].sort(() => Math.random() - 0.5).slice(0, 3);
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setExpanded(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="p-6 bg-white/80 backdrop-blur-md sticky top-0 z-[200]">
        <h1 className="font-bold text-xl text-center text-indigo-600 tracking-widest uppercase">
          Creator's Card
        </h1>
      </header>

      <section className="bg-slate-50 px-6 pb-2">
        <section className="relative py-10 text-center">
          <a
            href={`${import.meta.env.BASE_URL}creator-upload.html`}
            className="absolute right-0 top-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow"
          >
            作品を登録する
          </a>
          <h2 className="text-2xl font-bold mb-4 italic">
            あなたの「ワクワク」が、
            <br />
            クリエイターの力になる。
          </h2>
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">
            Select your masterpiece
          </p>
        </section>

        <section ref={stageRef} className={`stage mb-4 ${expanded ? 'expanded' : ''}`}>
          <button
            type="button"
            onClick={() => featuredCards[0] && onCardClick(featuredCards[0])}
            aria-label={featuredCards[0]?.title ?? 'Sample 01'}
            className="single-card card-left p-3"
          >
            <div className="h-full w-full overflow-hidden rounded-xl">
              <SmartImage
                src={featuredCards[0]?.image_url ?? 'card-images/card-01.png'}
                alt={featuredCards[0]?.title ?? 'Sample 01'}
                className="h-full w-full object-cover"
              />
            </div>
          </button>
          <button
            type="button"
            onClick={() => featuredCards[1] && onCardClick(featuredCards[1])}
            aria-label={featuredCards[1]?.title ?? 'Sample 02'}
            className="single-card card-center p-3"
          >
            <div className="h-full w-full overflow-hidden rounded-xl">
              <SmartImage
                src={featuredCards[1]?.image_url ?? '/card-images/card-02.png'}
                alt={featuredCards[1]?.title ?? 'Sample 02'}
                className="h-full w-full object-cover"
              />
            </div>
          </button>
          <button
            type="button"
            onClick={() => featuredCards[2] && onCardClick(featuredCards[2])}
            aria-label={featuredCards[2]?.title ?? 'Sample 03'}
            className="single-card card-right p-3"
          >
            <div className="h-full w-full overflow-hidden rounded-xl">
              <SmartImage
                src={featuredCards[2]?.image_url ?? '/card-images/card-03.png'}
                alt={featuredCards[2]?.title ?? 'Sample 03'}
                className="h-full w-full object-cover"
              />
            </div>
          </button>
        </section>
      </section>

      <div className="h-2" />
    </>
  );
}



