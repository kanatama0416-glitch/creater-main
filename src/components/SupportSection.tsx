import { Users, TrendingUp, Sparkles } from 'lucide-react';

export function SupportSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            このカードは、クリエイターを応援するカードです
          </h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
            あなたがカードを使うたびに、デザインを担当したクリエイターに収益が還元されます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">カード発行時</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              カードを作成した時点でクリエイターに還元
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">カード利用時</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              お買い物をするたびに継続的に還元
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">継続的な支援</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              クリエイターの活動を長期的にサポート
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
