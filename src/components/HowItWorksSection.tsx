import { Card } from "@/components/ui/card";
import { Upload, Brain, FileSpreadsheet, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Загрузите данные",
    description: "Фото питомца, PDF-анализы или медицинские снимки",
    details: ["Drag & Drop интерфейс", "До 10 файлов за раз", "Все популярные форматы"]
  },
  {
    icon: Brain,
    number: "02", 
    title: "AI-анализ",
    description: "Наши специализированные агенты обрабатывают данные",
    details: ["3 независимых модуля", "Анализ за 30-60 секунд", "Машинное обучение"]
  },
  {
    icon: FileSpreadsheet,
    number: "03",
    title: "Получите отчёт",
    description: "Подробная диагностика с рекомендациями",
    details: ["Уровень доверия", "Рекомендации", "PDF для ветеринара"]
  },
  {
    icon: MessageCircle,
    number: "04",
    title: "Задайте вопросы",
    description: "Уточните детали в чате с AI-экспертами",
    details: ["Живой диалог", "Дополнительные вопросы", "Персональные советы"]
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Как это работает
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Простой процесс в 4 шага от загрузки до получения профессиональной диагностики
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card 
                key={step.number}
                className="relative p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in border-0 shadow-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow">
                    {step.number}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-success rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connecting Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-8 text-primary/30">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 shadow-glow">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Готовы попробовать?
            </h3>
            <p className="text-muted-foreground mb-6">
              Загрузите первый файл и убедитесь в качестве нашей AI-диагностики
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors shadow-card">
                Попробовать бесплатно
              </button>
              <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-card">
                Смотреть демо
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;