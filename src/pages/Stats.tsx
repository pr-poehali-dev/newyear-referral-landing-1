import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface LinkStats {
  link_name: string;
  link_url: string;
  click_count: number;
  last_click: string | null;
}

interface BankStats {
  bank_name: string;
  total_clicks: number;
  links: LinkStats[];
}

interface StatsData {
  total_clicks: number;
  today_clicks: number;
  banks: BankStats[];
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/ef35ec21-8faf-4e1f-a905-f25fbb60126e');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📊</div>
          <p className="text-gray-600">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Нет данных</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
              Статистика переходов
            </h1>
            <p className="text-gray-600">Аналитика кликов по банковским предложениям</p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-500 rounded-full">
                    <Icon name="MousePointerClick" size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Всего переходов</p>
                    <p className="text-4xl font-bold text-blue-600">{stats.total_clicks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-green-500 rounded-full">
                    <Icon name="TrendingUp" size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Сегодня</p>
                    <p className="text-4xl font-bold text-green-600">{stats.today_clicks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Banks Stats */}
          <div className="space-y-6">
            {stats.banks.map((bank, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Icon name="Building2" className="text-blue-500" />
                      {bank.bank_name}
                    </CardTitle>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Всего кликов</p>
                      <p className="text-3xl font-bold text-blue-600">{bank.total_clicks}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {bank.links.map((link, linkIndex) => (
                      <div 
                        key={linkIndex}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Link" size={16} className="text-gray-400" />
                            <p className="font-semibold text-gray-800">{link.link_name}</p>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{link.link_url}</p>
                          {link.last_click && (
                            <p className="text-xs text-gray-400 mt-1">
                              Последний клик: {new Date(link.last_click).toLocaleString('ru-RU')}
                            </p>
                          )}
                        </div>
                        <div className="ml-4 flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">{link.click_count}</p>
                            <p className="text-xs text-gray-500">кликов</p>
                          </div>
                          <Icon name="MousePointerClick" size={24} className="text-blue-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {stats.banks.length === 0 && (
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <Icon name="BarChart3" size={64} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Пока нет данных о переходах</p>
                <p className="text-gray-400 text-sm mt-2">Кликните по ссылкам на главной странице, чтобы начать сбор статистики</p>
              </CardContent>
            </Card>
          )}

          {/* Back Button */}
          <div className="mt-12 text-center">
            <a 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              <Icon name="ArrowLeft" size={20} />
              Вернуться на главную
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
