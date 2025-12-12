import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function Index() {
  const banks = [
    {
      name: 'Т-Банк',
      logo: '⚫️',
      color: 'from-yellow-400 to-yellow-500',
      bonus: 'До 25000₽',
      description: 'за открытие счёта и дебетовую карту',
      features: ['Промокод: GIFT2025', 'Кешбэк до 30%', 'Бесплатное обслуживание'],
      link: '#'
    },
    {
      name: 'ВТБ',
      logo: '🔵',
      color: 'from-blue-500 to-blue-600',
      bonus: 'До 15000₽',
      description: 'на накопительный счёт до 20% годовых',
      features: ['Промокод: VTB2025', 'Мультикарта с кешбэком', 'Инвестиции от 1000₽'],
      link: '#'
    },
    {
      name: 'Альфа-Банк',
      logo: '🔴',
      color: 'from-red-500 to-red-600',
      bonus: 'До 10000₽',
      description: 'за подписку Альфа-Премиум',
      features: ['Промокод: ALFA25', 'Кешбэк до 100%', 'Бесплатные переводы'],
      link: '#'
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

            <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-gray-600">
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
          </div>
        </div>
      </section>

      {/* Banks Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {banks.map((bank, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-5xl mb-3">{bank.logo}</div>
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

                <Button 
                  className={`w-full bg-gradient-to-r ${bank.color} hover:opacity-90 transition-all hover:scale-105 text-white font-semibold text-lg`}
                  size="lg"
                  asChild
                >
                  <a href={bank.link} target="_blank" rel="noopener noreferrer">
                    <Icon name="Gift" className="mr-2" size={22} />
                    Получить подарок
                  </a>
                </Button>
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