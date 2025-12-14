import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasTracked = useRef(false);

  const trackClick = async (bankName: string, linkName: string, linkUrl: string) => {
    try {
      await fetch('https://functions.poehali.dev/5ba5a1dc-190b-485a-aa3f-c0cae99b7b5a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bank_name: bankName, link_name: linkName, link_url: linkUrl })
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  useEffect(() => {
    const trackVisitor = async () => {
      if (hasTracked.current) return;
      hasTracked.current = true;

      const hasVisited = localStorage.getItem('visited');
      const isUnique = !hasVisited;
      
      if (isUnique) {
        localStorage.setItem('visited', 'true');
      }

      try {
        const response = await fetch('https://functions.poehali.dev/7b4fa474-4677-4e22-8a39-7ee709cf5f8c', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ unique: isUnique })
        });
        const data = await response.json();
        setVisitorCount(data.total);
      } catch (error) {
        console.error('Failed to track visitor:', error);
        const response = await fetch('https://functions.poehali.dev/7b4fa474-4677-4e22-8a39-7ee709cf5f8c');
        const data = await response.json();
        setVisitorCount(data.total);
      }
    };

    trackVisitor();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...prev, index]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);
  const banks = [
    {
      name: 'Т-Банк',
      logo: 'https://cdn.poehali.dev/projects/2678937e-cf3d-43b2-9398-622888228a8f/files/926c2a26-9549-4d46-a430-08755ab0b46e.jpg',
      color: 'from-yellow-400 to-yellow-500',
      bonus: 'До 25000₽',
      description: 'за открытие счёта и дебетовую карту',
      features: ['Промокод: GIFT2025', 'Кешбэк до 30%', 'Бесплатное обслуживание'],
      link: 'https://tbank.ru/baf/3ZMdSH6pdjA'
    },
    {
      name: 'ВТБ',
      logo: 'https://cdn.poehali.dev/projects/2678937e-cf3d-43b2-9398-622888228a8f/files/216b44d1-dff2-4506-b94c-dcbab353534e.jpg',
      color: 'from-blue-500 to-blue-600',
      bonus: 'До 15000₽',
      description: '5 выгодных предложений для вас',
      features: ['Зарплатная карта', 'Дебетовая карта', 'Пакеты Привилегия и Прайм', 'Получение пенсии', 'Бонусы и кешбэк'],
      links: [
        { name: 'Зарплатная карта', url: 'https://vtb.ru/l/b5416k2t' },
        { name: 'Дебетовая карта', url: 'https://vtb.ru/l/e1k0tpk5' },
        { name: 'Пакет Привилегия', url: 'https://vtb.ru/l/118116x4' },
        { name: 'Получение пенсии', url: 'https://vtb.ru/l/6308em89' },
        { name: 'Пакет Прайм', url: 'https://vtb.ru/l/1m4echme' }
      ]
    },
    {
      name: 'Альфа-Банк',
      logo: 'https://cdn.poehali.dev/projects/2678937e-cf3d-43b2-9398-622888228a8f/files/8544100b-c5b0-442b-8806-8c96276d0913.jpg',
      color: 'from-red-500 to-red-600',
      bonus: 'До 10000₽',
      description: 'деньги за карту или счёт + бонусы для бизнеса',
      features: ['Карты и счета для физлиц', 'Счет для бизнеса: 2000 баллов', 'Переводы 0₽ для ИП/ООО', 'Кэшбэк до 10%'],
      links: [
        { name: 'Для физлиц', url: 'https://alfa.me/PSgISW' },
        { name: 'Для бизнеса (ИП/ООО)', url: 'https://alfa.me/nn1B5i' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-green-500/10 to-yellow-500/10 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-bounce">
              <span className="text-8xl">🎁</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
              ПОДАРИ СЕБЕ БАНК
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              Новогодние предложения от топовых банков России
            </p>
            
            <p className="text-lg text-gray-600 mb-8">
              Получи до 25 000₽ бонусами — лучший подарок к празднику! 🎄
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Icon name="Gift" size={20} className="text-red-500" />
                <span>Эксклюзивные бонусы</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={20} className="text-yellow-500" />
                <span>Промокоды 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-green-500" />
                <span>Официальные банки</span>
              </div>
            </div>

            {/* Visitor Counter */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200">
              <Icon name="Users" size={20} className="text-blue-500" />
              <span className="text-gray-700 font-medium">
                Сайт посетило: <span className="text-blue-600 font-bold">{visitorCount.toLocaleString('ru-RU')}</span> человек
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Banks Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {banks.map((bank, index) => (
            <Card 
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 overflow-hidden ${
                visibleCards.includes(index) ? 'animate-on-scroll' : ''
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={bank.logo} alt={bank.name} className="w-16 h-16 object-contain rounded-lg" />
                    <h3 className="text-2xl font-bold text-gray-900">{bank.name}</h3>
                  </div>
                  
                  <div className={`bg-gradient-to-r ${bank.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {bank.bonus}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{bank.description}</p>

                <div className="space-y-3 mb-6">
                  {bank.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {(bank as any).links ? (
                  <div className="space-y-2">
                    {(bank as any).links.map((link: any, i: number) => (
                      <Button 
                        key={i}
                        className={`w-full bg-gradient-to-r ${bank.color} hover:opacity-90 transition-all hover:scale-105 text-white font-semibold`}
                        size="default"
                        onClick={() => {
                          trackClick(bank.name, link.name, link.url);
                          window.open(link.url, '_blank');
                        }}
                      >
                        <Icon name="ExternalLink" className="mr-2" size={18} />
                        {link.name}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Button 
                    className={`w-full bg-gradient-to-r ${bank.color} hover:opacity-90 transition-all hover:scale-105 text-white font-semibold text-lg`}
                    size="lg"
                    onClick={() => {
                      trackClick(bank.name, 'Основная кнопка', (bank as any).link);
                      window.open((bank as any).link, '_blank');
                    }}
                  >
                    <Icon name="Gift" className="mr-2" size={22} />
                    Получить подарок
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-r from-red-500/5 via-green-500/5 to-yellow-500/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Как получить свой подарок?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Выбери банк</h3>
              <p className="text-gray-600">Изучи предложения и выбери самое выгодное</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Введи промокод</h3>
              <p className="text-gray-600">Используй эксклюзивный промокод при оформлении</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Получи бонусы</h3>
              <p className="text-gray-600">Деньги придут на счёт в течение 5 дней</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-red-500 via-green-500 to-yellow-500 border-0">
          <CardContent className="p-12 text-center text-white">
            <div className="text-6xl mb-6">🎄</div>
            <h2 className="text-4xl font-bold mb-4">
              Не упусти новогодние предложения!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Акции действуют ограниченное время. Успей оформить карту до конца января 2025!
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold text-lg px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Icon name="ArrowUp" className="mr-2" size={22} />
              Выбрать банк
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 ПОДАРИ СЕБЕ БАНК. Все условия акций уточняйте на сайтах банков.
          </p>
        </div>
      </footer>
    </div>
  );
}