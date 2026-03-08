import { Card } from './supabase';

export const localCardSlots: Card[] = Array.from({ length: 16 }, (_, index) => {
  const slotNumber = String(index + 1).padStart(2, '0');

  return {
    id: `local-card-${slotNumber}`,
    creator_id: `local-creator-${slotNumber}`,
    title: `カード画像スロット ${slotNumber}`,
    description: `public/card-images/card-${slotNumber}.png を好きな画像に差し替えてください。`,
    image_url: `${import.meta.env.BASE_URL}card-images/card-${slotNumber}.png`,
    concept: `このカードは仮表示です。画像ファイルを置き換えると一覧に反映されます。`,
    created_at: new Date(0).toISOString()
  };
});
