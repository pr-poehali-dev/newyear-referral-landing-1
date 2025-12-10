import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setSnowflakes(flakes);
  }, []);

  const banks = [
    {
      name: 'Т-Банк',
      logo: '🟡',
      color: 'from-yellow-500 to-yellow-600',
      bonus: 'До 5000₽',
      description: 'за каждого приглашенного друга',
      features: ['Кешбэк до 30%', 'Бесплатное обслуживание', 'Переводы без комиссии'],
      link: '#'
    },
    {
      name: 'ВТБ',
      logo: '🔵',
      color: 'from-blue-500 to-blue-600',
      bonus: 'До 3000₽',
      description: 'за регистрацию по реферальной ссылке',
      features: ['Накопительный счёт до 20%', 'Кредитная карта 120 дней', 'Бонусы за покупки'],
      link: '#'
    },
    {
      name: 'Альфа-Банк',
      logo: '🔴',
      color: 'from-red-500 to-red-600',
      bonus: 'До 10000₽',
      description: 'кешбэк и бонусы за активность',
      features: ['Суперкешбэк до 100%', '2 месяца бесплатно', 'Премиум подписки в подарок'],
      link: '#'
    }
  ];

  const benefits = [
    {
      icon: 'Gift',
      title: 'Щедрые бонусы',
      description: 'Получайте до 10 000₽ за каждого друга'
    },
    {
      icon: 'Repeat',
      title: 'Регулярный доход',
      description: 'Реферальные выплаты каждый месяц'
    },
    {
      icon: 'Users',
      title: 'Неограниченно',
      description: 'Приглашайте столько друзей, сколько хотите'
    },
    {
      icon: 'Zap',
      title: 'Быстрые выплаты',
      description: 'Бонусы начисляются мгновенно'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card overflow-hidden relative">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄️
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative z-10">
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-4xl md:text-6xl mb-4">
              <span className="twinkle">✨</span>
              <span className="twinkle" style={{ animationDelay: '0.5s' }}>🎄</span>
              <span className="twinkle" style={{ animationDelay: '1s' }}>✨</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-glow">
              Новогодние бонусы
            </h1>
            
            <p className="text-2xl md:text-4xl font-semibold text-primary">
              от ведущих банков России
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
              Получайте щедрые вознаграждения за приглашение друзей в Т-Банк, ВТБ и Альфа-Банк
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => document.getElementById('banks')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Gift" className="mr-2" size={24} />
              Получить бонусы
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 hover:bg-card/50 transition-all hover:scale-105"
              onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Info" className="mr-2" size={24} />
              Как это работает
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">18 000₽</div>
              <div className="text-sm text-muted-foreground">максимальный бонус</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div>
              <div className="text-4xl font-bold text-secondary">3 банка</div>
              <div className="text-sm text-muted-foreground">лучшие предложения</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div>
              <div className="text-4xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">без ограничений</div>
            </div>
          </div>
        </section>

        <section id="banks" className="py-20">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <span>🎁</span>
              Реферальные программы банков
              <span>🎁</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выбирайте банк и начинайте зарабатывать на рекомендациях прямо сейчас
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {banks.map((bank, index) => (
              <Card 
                key={bank.name} 
                className="border-2 hover:border-primary transition-all hover:scale-105 hover:shadow-2xl bg-card/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center">
                  <div className={`text-8xl mb-4 animate-glow`}>
                    {bank.logo}
                  </div>
                  <CardTitle className="text-3xl mb-2">{bank.name}</CardTitle>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${bank.color} bg-clip-text text-transparent`}>
                    {bank.bonus}
                  </div>
                  <CardDescription className="text-base mt-2">
                    {bank.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {bank.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 bg-gradient-to-r ${bank.color} hover:opacity-90 transition-all hover:scale-105`}
                    size="lg"
                  >
                    <Icon name="ExternalLink" className="mr-2" size={20} />
                    Получить ссылку
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="benefits" className="py-20">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <span>⭐</span>
              Преимущества реферальной системы
              <span>⭐</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Зарабатывайте вместе с друзьями — просто, выгодно, надежно
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="text-center p-6 hover:border-primary transition-all hover:scale-105 bg-card/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon name={benefit.icon as any} className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>

          <Card className="mt-16 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border-2 border-primary/30 animate-slide-up">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="text-5xl mb-4">🎊</div>
              <h3 className="text-3xl font-bold mb-4">
                Начните зарабатывать прямо сейчас!
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Выберите банк, получите реферальную ссылку и делитесь ей с друзьями. 
                За каждого нового клиента вы получите щедрое вознаграждение!
              </p>
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                onClick={() => document.getElementById('banks')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Sparkles" className="mr-2" size={24} />
                Выбрать банк
              </Button>
            </CardContent>
          </Card>
        </section>

        <footer className="py-12 text-center border-t border-border mt-20">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-2xl">
              <span className="twinkle">🎄</span>
              <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                С Новым Годом!
              </span>
              <span className="twinkle" style={{ animationDelay: '1s' }}>✨</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Пусть новый год принесет вам не только праздничное настроение, но и финансовое благополучие
            </p>
            <div className="text-xs text-muted-foreground mt-4">
              © 2025 Новогодние бонусы. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
