import { useState, useEffect, useMemo } from 'react';
import { supabase, Card, CardSubmission, FAQ, isSupabaseConfigured } from './lib/supabase';
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
  const [creatorQuery, setCreatorQuery] = useState('');
  const [showCreatorCardAbout, setShowCreatorCardAbout] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const dedupeSubmissions = (submissions: CardSubmission[]) => {
    const seen = new Set<string>();
    return submissions.filter((submission) => {
      const creatorKey = submission.creator_name?.trim() || 'anonymous';
      const key = `${submission.image_url}::${creatorKey}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const mapSubmissionToCard = (submission: CardSubmission): Card => {
    const creatorName = submission.creator_name?.trim() || '匿名クリエイター';
    const creatorId = `submission-${submission.id}`;
    const createdAt = submission.created_at ?? new Date(0).toISOString();
    return {
      id: `submission-${submission.id}`,
      creator_id: creatorId,
      title: `${creatorName}の作品`,
      description: null,
      image_url: submission.image_url,
      concept: submission.concept,
      created_at: createdAt,
      creator: {
        id: creatorId,
        name: creatorName,
        bio: null,
        twitter_url: null,
        instagram_url: null,
        website_url: null,
        note_url: null,
        youtube_url: null,
        avatar_url: null,
        comment: submission.concept,
        created_at: createdAt
      }
    };
  };

  const fetchData = async () => {
    if (!isSupabaseConfigured || !supabase) {
      console.warn(
        'Supabase environment variables are not configured. Rendering page without remote data.'
      );
      setLoading(false);
      return;
    }

    try {
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('card_submissions')
        .select('*')
        .order('id', { ascending: false });

      if (submissionsError) throw submissionsError;

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

      const dedupedSubmissions = dedupeSubmissions(submissionsData || []);
      const mappedSubmissions = dedupedSubmissions.map((submission) =>
        mapSubmissionToCard(submission)
      );
      const remoteCards = [...mappedSubmissions, ...(cardsData || [])];
      const mergedCards = [...remoteCards, ...localCardSlots];

      setCards(mergedCards);
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
    const normalizedQuery = creatorQuery.trim().toLowerCase();
    return randomizedCards.filter((card) => {
      const creatorName = card.creator?.name;
      if (!creatorName) return false;
      if (selectedGenre && creatorGenreByName[creatorName] !== selectedGenre) return false;
      if (!normalizedQuery) return true;
      return creatorName.toLowerCase().includes(normalizedQuery);
    });
  }, [randomizedCards, selectedGenre, creatorQuery]);
  const creatorNameOptions = useMemo(() => {
    const names = new Set<string>();
    displayCards.forEach((card) => {
      if (card.creator?.name) {
        names.add(card.creator.name);
      }
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b, 'ja'));
  }, [displayCards]);

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
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowCreatorCardAbout(true)}
                className="rounded-full border border-indigo-200 bg-white px-5 py-2 text-sm font-semibold text-indigo-600 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow"
              >
                クリエイターカードについて
              </button>
            </div>
            <p className="mt-4 text-gray-600 text-lg">
              {'ワクワクするデザインをクリックしてみましょう'}
            </p>
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
            <div className="mt-4 flex justify-center">
              <label className="w-full max-w-md">
                <span className="sr-only">クリエイター名で検索</span>
                <input
                  type="search"
                  value={creatorQuery}
                  onChange={(event) => setCreatorQuery(event.target.value)}
                  placeholder="クリエイター名で検索"
                  list="creator-name-suggestions"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                />
              </label>
              <datalist id="creator-name-suggestions">
                {creatorNameOptions.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>
          </div>
          <CardGrid cards={filteredCards} onCardClick={setSelectedCard} />
        </div>
      </section>

      <SupportSection />

      <FeaturesSection />

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

      {showCreatorCardAbout && (
        <div className="fixed inset-0 z-[300] bg-black/50 p-4">
          <div className="mx-auto flex h-full w-full max-w-md min-h-0 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h3 className="text-sm font-bold text-slate-700">クリエイターカードについて</h3>
              <button
                type="button"
                onClick={() => setShowCreatorCardAbout(false)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                閉じる
              </button>
            </div>
            <iframe
              src="creator-card-about.html"
              title="クリエイターカードについて"
              className="h-full min-h-0 w-full flex-1 border-0 [touch-action:manipulation]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

