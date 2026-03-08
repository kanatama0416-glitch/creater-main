import { X, Twitter, Instagram, Globe, FileText, Youtube } from 'lucide-react';
import { Card } from '../lib/supabase';

interface CardDetailModalProps {
  card: Card;
  onClose: () => void;
}

export function CardDetailModal({ card, onClose }: CardDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">{card.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8">
            <img
              src={card.image_url}
              alt={card.title}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          {card.concept && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {'\u30c7\u30b6\u30a4\u30f3\u30b3\u30f3\u30bb\u30d7\u30c8'}
              </h3>
              <p className="text-gray-700 leading-relaxed">{card.concept}</p>
            </div>
          )}

          {card.creator && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {'\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u7d39\u4ecb'}
              </h3>
              <div className="flex items-start gap-4">
                {card.creator.avatar_url && (
                  <img
                    src={card.creator.avatar_url}
                    alt={card.creator.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{card.creator.name}</p>
                  {card.creator.bio && (
                    <p className="text-sm text-gray-600 mb-3">{card.creator.bio}</p>
                  )}
                  {card.creator.comment && (
                    <p className="text-sm text-gray-700 italic mb-3 p-3 bg-white rounded-lg">
                      "{card.creator.comment}"
                    </p>
                  )}
                  <div className="flex flex-wrap items-start gap-3">
                    {card.creator.twitter_url && (
                      <div className="flex w-14 flex-col items-center gap-1">
                        <a
                          href={card.creator.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                          aria-label="X"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                        <span className="text-[10px] leading-none text-gray-500">X</span>
                      </div>
                    )}
                    {card.creator.instagram_url && (
                      <div className="flex w-14 flex-col items-center gap-1">
                        <a
                          href={card.creator.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:text-pink-600 transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <span className="text-[10px] leading-none text-gray-500">Instagram</span>
                      </div>
                    )}
                    {card.creator.website_url && (
                      <div className="flex w-14 flex-col items-center gap-1">
                        <a
                          href={card.creator.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-700 transition-colors"
                          aria-label="Website"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                        <span className="text-[10px] leading-none text-gray-500">Website</span>
                      </div>
                    )}
                    {card.creator.note_url && (
                      <div className="flex w-14 flex-col items-center gap-1">
                        <a
                          href={card.creator.note_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 transition-colors"
                          aria-label="note"
                        >
                          <FileText className="w-5 h-5" />
                        </a>
                        <span className="text-[10px] leading-none text-gray-500">note</span>
                      </div>
                    )}
                    {card.creator.youtube_url && (
                      <div className="flex w-14 flex-col items-center gap-1">
                        <a
                          href={card.creator.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700 transition-colors"
                          aria-label="YouTube"
                        >
                          <Youtube className="w-5 h-5" />
                        </a>
                        <span className="text-[10px] leading-none text-gray-500">YouTube</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-blue-900 mb-2 font-medium">
              {'\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u9084\u5143\u306b\u3064\u3044\u3066'}
            </p>
            <p className="text-sm text-blue-800">
              {
                '\u3053\u306e\u30ab\u30fc\u30c9\u3092\u4f7f\u3046\u305f\u3073\u306b\u3001\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u306b\u53ce\u76ca\u304c\u9084\u5143\u3055\u308c\u307e\u3059\u3002\u30ab\u30fc\u30c9\u3092\u9078\u3076\u3053\u3068\u304c\u3001\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u306e\u6d3b\u52d5\u3092\u5fdc\u63f4\u3059\u308b\u3053\u3068\u306b\u3064\u306a\u304c\u308a\u307e\u3059\u3002'
              }
            </p>
          </div>

          <button
            onClick={() =>
              alert(
                '\u7533\u3057\u8fbc\u307f\u30d5\u30a9\u30fc\u30e0\u3078\u79fb\u52d5\u3057\u307e\u3059\uff08\u5b9f\u88c5\u4e88\u5b9a\uff09'
              )
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            {'\u3053\u306e\u30ab\u30fc\u30c9\u3092\u7533\u3057\u8fbc\u3080'}
          </button>
        </div>
      </div>
    </div>
  );
}

