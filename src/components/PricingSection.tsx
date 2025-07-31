import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Building } from "lucide-react";

const plans = [
  {
    name: "Базовый",
    price: "399",
    period: "за диагностику",
    description: "Идеально для разовых случаев",
    icon: Zap,
    features: [
      "1 диагностика любого типа",
      "Анализ до 3 файлов",
      "Базовый отчёт",
      "Чат с AI (5 вопросов)",
      "PDF-экспорт результатов"
    ],
    highlighted: false,
    variant: "default"
  },
  {
    name: "Премиум",
    price: "1990",
    period: "в месяц",
    description: "Для владельцев нескольких питомцев",
    icon: Crown,
    features: [
      "До 10 диагностик в месяц",
      "Неограниченные файлы",
      "Расширенный отчёт",
      "Безлимитный чат с AI",
      "Приоритетная поддержка",
      "История всех диагностик",
      "Уведомления о здоровье"
    ],
    highlighted: true,
    variant: "hero"
  },
  {
    name: "Для ветклиник",
    price: "по запросу",
    period: "корпоративный",
    description: "Для профессиональных ветеринаров",
    icon: Building,
    features: [
      "Безлимитные диагностики",
      "API-интеграция",
      "Брендированные отчёты",
      "Аналитика и статистика",
      "Многопользовательский доступ",
      "Техническая поддержка 24/7",
      "Обучение персонала"
    ],
    highlighted: false,
    variant: "accent"
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Тарифы для каждого
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Выберите подходящий план или начните с бесплатной диагностики
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative p-8 hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in border-0 shadow-card
                ${plan.highlighted ? 'ring-2 ring-primary shadow-glow' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-glow">
                    Популярный выбор
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center">
                    {plan.price !== "по запросу" ? (
                      <>
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-lg text-muted-foreground ml-1">₽</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1">{plan.period}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-success mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant={plan.variant as any} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.name === "Для ветклиник" ? "Связаться с нами" : "Выбрать план"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bonus System Teaser */}
        <div className="bg-gamification/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            🎮 Бонусная система и достижения
          </h3>
          <p className="text-muted-foreground mb-6">
            Зарабатывайте баллы за диагностики, приглашайте друзей и получайте скидки!
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-background rounded-lg p-4">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-medium text-foreground">Достижения</div>
              <div className="text-muted-foreground">Разблокируйте бейджи</div>
            </div>
            <div className="bg-background rounded-lg p-4">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-medium text-foreground">Бонусы</div>
              <div className="text-muted-foreground">За каждую диагностику</div>
            </div>
            <div className="bg-background rounded-lg p-4">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium text-foreground">Рефералы</div>
              <div className="text-muted-foreground">Приглашайте друзей</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;