import { Card } from '../lib/supabase';
import { SmartImage } from './SmartImage';

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

export function CardGrid({ cards, onCardClick }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => onCardClick(card)}
          aria-label={card.title}
          className="group block w-full bg-transparent border-0 p-0 text-left shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div
            className="w-full rounded-2xl bg-gray-100 overflow-hidden"
            style={{ aspectRatio: '85.6 / 53.98' }}
          >
            <SmartImage
              src={card.image_url}
              alt={card.title}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
