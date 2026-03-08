import { useState, useEffect, useMemo } from 'react';
import { supabase, Card, FAQ, isSupabaseConfigured } from './lib/supabase';
import { localCardSlots } from './lib/localCardSlots';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CardGrid } from './components/CardGrid';
import { CardDetailPage } from './components/CardDetailPage';
import { SupportSection } from './components/SupportSection';
import { FAQSection } from './components/FAQSection';

const creatorGenreByName: Record<string, string> = {
  おがわこうた: 'キャラクター',
  テペソのトム: 'キャラクター',
  庭野リサ: 'キャラクター',
  'Ryusuke Sano': '現代アート',
  CHiNPAN: '伝統',
  'dana wadaharuna': '生活'
};

function App() {
  const genreOptions = ['キャラクター', '現代アート', '伝統', '生活'];
  const [cards, setCards] = useState<Card[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!isSupabaseConfigured || !supabase) {
      console.warn(
        'Supabase environment variables are not configured. Rendering page without remote data.'
      );
      setLoading(false);
      return;
    }

    try {
      const { data: cardsData, error: cardsError } = await supabase
        .from('cards')
        .select(`
          *,
          creator:creators(*)
        `)
        .order('created_at', { ascending: false });

      if (cardsError) throw cardsError;

      const { data: faqsData, error: faqsError } = await supabase
        .from('faqs')
        .select('*')
        .order('order_num', { ascending: true });

      if (faqsError) throw faqsError;

      setCards(cardsData || []);
      setFaqs(faqsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayCards = cards.length === 0 ? localCardSlots : cards;
  const randomizedCards = useMemo(() => {
    return [...displayCards].sort(() => Math.random() - 0.5);
  }, [displayCards]);
  const filteredCards = useMemo(() => {
    if (!selectedGenre) return randomizedCards;

    return randomizedCards.filter((card) => {
      const creatorName = card.creator?.name;
      if (!creatorName) return false;
      return creatorGenreByName[creatorName] === selectedGenre;
    });
  }, [randomizedCards, selectedGenre]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{'\u8aad\u307f\u8fbc\u307f\u4e2d...'}</p>
        </div>
      </div>
    );
  }

  if (selectedCard) {
    return (
      <CardDetailPage
        card={selectedCard}
        cards={displayCards}
        onBack={() => setSelectedCard(null)}
        onCardClick={setSelectedCard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection onCardClick={setSelectedCard} />

      <section className="pt-3 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg">{'ワクワクを探してみましょう'}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {genreOptions.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setSelectedGenre((prev) => (prev === genre ? null : genre))}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    selectedGenre === genre
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <CardGrid cards={filteredCards} onCardClick={setSelectedCard} />
        </div>
      </section>

      <FeaturesSection />

      <SupportSection />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {'\u3088\u304f\u3042\u308b\u8cea\u554f'}
          </h2>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 {'\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30ba\u30ab\u30fc\u30c9'}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
