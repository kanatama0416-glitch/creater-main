import { Card } from './supabase';

type LocalCreator = { id: string; name: string };

const creatorBySlot: Record<string, LocalCreator> = {
  '01': { id: 'creator-chinpan', name: 'CHiNPAN' },
  '02': { id: 'creator-chinpan', name: 'CHiNPAN' },
  '03': { id: 'creator-akira-uesugi', name: 'AkiraUesugi' },
  '04': { id: 'creator-akira-uesugi', name: 'AkiraUesugi' },
  '05': { id: 'creator-risa-niwano', name: '庭野リサ' },
  '06': { id: 'creator-nana-soeda', name: 'NANA SOEDA' },
  '07': { id: 'creator-nana-soeda', name: 'NANA SOEDA' },
  '08': { id: 'creator-ogawa-kota', name: 'おがわこうた' },
  '09': { id: 'creator-ogawa-kota', name: 'おがわこうた' },
  '10': { id: 'creator-ogawa-kota', name: 'おがわこうた' },
  '11': { id: 'creator-tepeso-tom', name: 'テペソのトム' },
  '12': { id: 'creator-tepeso-tom', name: 'テペソのトム' },
  '13': { id: 'creator-dana-wadaharuna', name: 'dana wadaharuna' },
  '14': { id: 'creator-dana-wadaharuna', name: 'dana wadaharuna' },
  '15': { id: 'creator-ryusuke-sano', name: 'Ryusuke Sano' },
  '16': { id: 'creator-ryusuke-sano', name: 'Ryusuke Sano' }
};

export const localCardSlots: Card[] = Array.from({ length: 16 }, (_, index) => {
  const slotNumber = String(index + 1).padStart(2, '0');
  const creator = creatorBySlot[slotNumber];
  const creatorId = creator?.id ?? `local-creator-${slotNumber}`;

  return {
    id: `local-card-${slotNumber}`,
    creator_id: creatorId,
    title: `カード画像スロット ${slotNumber}`,
    description: `public/card-images/card-${slotNumber}.png を好きな画像に差し替えてください。`,
    image_url: `./card-images/card-${slotNumber}.png`,
    concept: 'このカードは仮表示です。画像ファイルを置き換えると一覧に反映されます。',
    created_at: new Date(0).toISOString(),
    creator: creator
      ? {
          id: creator.id,
          name: creator.name,
          bio: null,
          twitter_url: null,
          instagram_url: null,
          website_url: null,
          note_url: null,
          youtube_url: null,
          avatar_url: null,
          comment: null,
          created_at: new Date(0).toISOString()
        }
      : undefined
  };
});
