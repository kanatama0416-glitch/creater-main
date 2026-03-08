import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Globe, Instagram, Twitter, FileText, Youtube } from 'lucide-react';
import { Card } from '../lib/supabase';
import { SmartImage } from './SmartImage';

interface CardDetailPageProps {
  card: Card;
  cards: Card[];
  onBack: () => void;
  onCardClick: (card: Card) => void;
}

type DetailTab = 'profile' | 'activity' | 'event';

const defaultCreatorStory = {
  name: '作者不明',
  bio: '色彩の余白と手触りを大切にしながら、日常の景色を少しだけ特別に見せるビジュアルを制作しています。抽象と物語性のあいだを行き来し、手に取った人が「自分だけの解釈」を楽しめる作品を目指しています。',
  comment:
    '「この作品をご覧いただきありがとうございます。視覚的なストーリーテリングを通して、好奇心と繋がりを刺激するために作品を制作しています。」',
  role: 'Illustrator / Digital Artist'
};

const creatorGenreByName: Record<string, string> = {
  おがわこうた: 'キャラクター',
  テペソのトム: 'キャラクター',
  庭野リサ: 'キャラクター',
  'Ryusuke Sano': '現代アート',
  CHiNPAN: '伝統',
  'dana wadaharuna': '生活'
};

export function CardDetailPage({ card, cards, onBack, onCardClick }: CardDetailPageProps) {
  const creator = card.creator ?? defaultCreatorStory;
  const creatorGenre = creatorGenreByName[creator.name];
  const creatorRole = (card.creator as any)?.role || defaultCreatorStory.role;
  const [activeTab, setActiveTab] = useState<DetailTab>('profile');
  const [imageRatio, setImageRatio] = useState(85.6 / 53.98);
  const snsLinks = [
    {
      label: 'X',
      href: card.creator?.twitter_url || 'https://x.com',
      icon: Twitter
    },
    {
      label: 'Instagram',
      href: card.creator?.instagram_url || 'https://www.instagram.com',
      icon: Instagram
    },
    {
      label: 'Website',
      href: card.creator?.website_url || 'https://example.com',
      icon: Globe
    },
    {
      label: 'note',
      href: card.creator?.note_url || 'https://note.com',
      icon: FileText
    },
    {
      label: 'YouTube',
      href: card.creator?.youtube_url || 'https://www.youtube.com',
      icon: Youtube
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [card.id]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setImageRatio(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = card.image_url;
  }, [card.image_url]);

  const activityItems = useMemo(
    () => [
      '大手雑貨ブランドのパッケージイラスト担当 (2025)',
      '雑誌「Art & Life」3月号にて特集インタビュー掲載'
    ],
    []
  );

  const eventItems = useMemo(
    () => [
      '個展「春の光、風の音」',
      '表参道ギャラリー A / 4月10日〜4月15日'
    ],
    []
  );

  const relatedCards = useMemo(() => {
    const currentCreatorId = card.creator?.id || card.creator_id;
    const currentCreatorName = card.creator?.name;

    return cards
      .filter((candidate) => {
        if (candidate.id === card.id) return false;

        if (currentCreatorId) {
          return candidate.creator_id === currentCreatorId || candidate.creator?.id === currentCreatorId;
        }

        return Boolean(currentCreatorName && candidate.creator?.name === currentCreatorName);
      })
      .slice(0, 6);
  }, [cards, card.id, card.creator?.id, card.creator?.name, card.creator_id]);

  return (
    <div className="min-h-screen bg-[#fdfbfb] pb-28">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </button>
          <p className="text-xs font-semibold tracking-wide text-slate-500">Creator Profile</p>
        </div>
      </header>

      <section className="rounded-b-[3rem] bg-gradient-to-br from-pink-200 to-indigo-200 px-6 pb-24 pt-10 shadow-lg">
        <div className="mx-auto max-w-md">
          <div
            className={`mx-auto flex rotate-3 flex-col rounded-3xl bg-white p-3 shadow-2xl [animation:floating_3s_ease-in-out_infinite] ${
              imageRatio < 1 ? 'max-w-[18rem]' : 'max-w-md'
            } w-full`}
            style={{ aspectRatio: String(imageRatio) }}
          >
            <div className="h-full w-full overflow-hidden rounded-2xl bg-slate-100">
              <SmartImage
                src={card.image_url}
                alt={card.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/50 bg-white/90 p-5 shadow-xl backdrop-blur-sm">
            <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500" />
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-indigo-500">Artist&apos;s Voice</p>
            <p className="text-sm font-medium leading-relaxed text-slate-700">
              {card.concept || creator.comment || defaultCreatorStory.comment}
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 px-6">
        <div className="mx-auto max-w-md rounded-[2rem] border border-slate-50 bg-white p-6 text-center shadow-md">
          <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-sm">
            {card.creator?.avatar_url ? (
              <img src={card.creator.avatar_url} alt={creator.name} className="h-full w-full object-cover" />
            ) : (
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Artist" alt="avatar" className="h-full w-full" />
            )}
          </div>
          <h1 className="text-xl font-bold text-slate-800">{creator.name}</h1>
          {creatorGenre ? (
            <p className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-indigo-600">
              ジャンル: {creatorGenre}
            </p>
          ) : (
            <p className="mt-1 text-xs text-slate-400">{creatorRole}</p>
          )}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-md px-4">
        <div className="mb-6 flex justify-around border-b border-slate-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-2 py-3 text-sm font-bold transition-all ${
              activeTab === 'profile' ? 'border-b-[3px] border-indigo-500 text-indigo-500' : 'text-slate-400'
            }`}
          >
            プロフィール
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-2 py-3 text-sm font-bold transition-all ${
              activeTab === 'activity' ? 'border-b-[3px] border-indigo-500 text-indigo-500' : 'text-slate-400'
            }`}
          >
            活動内容
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`px-2 py-3 text-sm font-bold transition-all ${
              activeTab === 'event' ? 'border-b-[3px] border-indigo-500 text-indigo-500' : 'text-slate-400'
            }`}
          >
            イベント
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="leading-relaxed text-slate-600 [animation:fadein_.25s_ease]">
            <h3 className="mb-2 font-bold italic text-slate-800">About Me</h3>
            <p className="text-sm">{creator.bio || defaultCreatorStory.bio}</p>
            <div className="mt-5 flex items-start gap-3">
              {snsLinks.map(({ label, href, icon: Icon }) => (
                <div key={label} className="flex w-14 flex-col items-center gap-1">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                  <span className="text-[10px] leading-none text-slate-500">{label}</span>
                </div>
              ))}
            </div>
            {relatedCards.length > 0 && (
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Other Cards</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {relatedCards.map((relatedCard) => (
                    <button
                      key={relatedCard.id}
                      type="button"
                      onClick={() => onCardClick(relatedCard)}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="w-full" style={{ aspectRatio: '85.6 / 53.98' }}>
                        <SmartImage
                          src={relatedCard.image_url}
                          alt={relatedCard.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4 [animation:fadein_.25s_ease]">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-lg bg-indigo-50 p-2 text-xs font-bold text-indigo-500">Works</div>
              <p className="text-sm text-slate-600">{activityItems[0]}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-lg bg-indigo-50 p-2 text-xs font-bold text-indigo-500">Media</div>
              <p className="text-sm text-slate-600">{activityItems[1]}</p>
            </div>
          </div>
        )}

        {activeTab === 'event' && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 [animation:fadein_.25s_ease]">
            <p className="mb-1 text-xs font-bold text-indigo-500">Upcoming Event</p>
            <h4 className="text-sm font-bold text-slate-800">{eventItems[0]}</h4>
            <p className="mt-2 text-xs text-slate-500">📍 {eventItems[1]}</p>
          </div>
        )}
      </section>

      <div className="fixed bottom-6 left-6 right-6 z-[100] mx-auto max-w-md">
        <button className="w-full rounded-2xl bg-slate-900 py-5 text-lg font-bold text-white shadow-2xl transition-all active:scale-[0.98]">
          カードを作る
        </button>
      </div>
    </div>
  );
}
