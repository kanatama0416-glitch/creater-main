/*
  # クリエイターズカードスキーマ作成

  ## 概要
  クリエイターとカードデザインを管理するためのデータベーススキーマを作成します。
  
  ## 作成するテーブル
  
  ### 1. creators (クリエイター情報)
  - `id` (uuid, primary key) - クリエイターID
  - `name` (text, not null) - クリエイター名
  - `bio` (text) - 自己紹介
  - `twitter_url` (text) - TwitterプロフィールURL
  - `instagram_url` (text) - InstagramプロフィールURL
  - `website_url` (text) - ウェブサイトURL
  - `avatar_url` (text) - アバター画像URL
  - `comment` (text) - クリエイターからのコメント
  - `created_at` (timestamptz) - 作成日時
  
  ### 2. cards (カードデザイン情報)
  - `id` (uuid, primary key) - カードID
  - `creator_id` (uuid, foreign key) - クリエイターID
  - `title` (text, not null) - カードタイトル
  - `description` (text) - カード説明
  - `image_url` (text, not null) - カード画像URL
  - `concept` (text) - デザインコンセプト
  - `created_at` (timestamptz) - 作成日時
  
  ### 3. faqs (よくある質問)
  - `id` (uuid, primary key) - FAQ ID
  - `question` (text, not null) - 質問
  - `answer` (text, not null) - 回答
  - `order_num` (integer) - 表示順
  - `created_at` (timestamptz) - 作成日時
  
  ## セキュリティ
  - すべてのテーブルでRow Level Security (RLS) を有効化
  - 公開情報のため、認証なしでSELECT可能
*/

-- creatorsテーブル作成
CREATE TABLE IF NOT EXISTS creators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  twitter_url text,
  instagram_url text,
  website_url text,
  avatar_url text,
  comment text,
  created_at timestamptz DEFAULT now()
);

-- cardsテーブル作成
CREATE TABLE IF NOT EXISTS cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  concept text,
  created_at timestamptz DEFAULT now()
);

-- faqsテーブル作成
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  order_num integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- RLSを有効化
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- 公開読み取りポリシー（誰でも閲覧可能）
CREATE POLICY "Anyone can view creators"
  ON creators FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view cards"
  ON cards FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view faqs"
  ON faqs FOR SELECT
  USING (true);

-- インデックス作成（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_cards_creator_id ON cards(creator_id);
CREATE INDEX IF NOT EXISTS idx_faqs_order_num ON faqs(order_num);