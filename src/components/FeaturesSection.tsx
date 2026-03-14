import { Heart, Palette, Backpack } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Palette,
      title: '個性的なデザイン',
      description: 'プロのクリエイターによる、唯一無二のカードデザイン',
    },
    {
      icon: Heart,
      title: 'クリエイター支援',
      description: 'カード利用でクリエイターを直接応援できる',
    },
    {
      icon: Backpack,
      title: '好きを持ち歩こう',
      description: 'お気に入りのクリエイター作品をいつでも一緒に持ち運べる',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          カードの特徴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
