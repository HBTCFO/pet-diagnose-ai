import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, FileText, Scan, Zap, Brain, Stethoscope } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Диагностика по фото",
    description: "Загрузите фото вашего питомца и получите анализ видимых симптомов",
    features: ["Кожные заболевания", "Травмы и раны", "Поведенческие признаки"],
    color: "primary",
    route: "/photo"
  },
  {
    icon: FileText,
    title: "Анализ лабораторных данных",
    description: "Интерпретация PDF-анализов крови, мочи и других исследований",
    features: ["Анализы крови", "Биохимия", "Гормональные тесты"],
    color: "secondary",
    route: "/labs"
  },
  {
    icon: Scan,
    title: "Радиологическая диагностика",
    description: "Анализ рентген-снимков, УЗИ и других изображений",
    features: ["Рентген", "УЗИ", "DICOM-файлы"],
    color: "accent",
    route: "/imaging"
  }
];

const aiAgents = [
  {
    icon: Brain,
    name: "Визуальный ассистент",
    description: "Анализирует фото и видео питомцев",
    confidence: "99.2%"
  },
  {
    icon: Stethoscope,
    name: "Лабораторный эксперт",
    description: "Интерпретирует результаты анализов",
    confidence: "98.7%"
  },
  {
    icon: Scan,
    name: "Радиолог",
    description: "Читает снимки и изображения",
    confidence: "97.8%"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
            <Zap className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">
              Наши AI-агенты
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Три специализированных модуля
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Каждый AI-агент обучен на миллионах ветеринарных случаев и специализируется 
            на определенном типе диагностики
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in border-0 shadow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 bg-${service.color}/10 rounded-lg flex items-center justify-center`}>
                  <service.icon className={`w-6 h-6 text-${service.color}`} />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={service.color as any} 
                  className="w-full"
                  onClick={() => window.location.href = service.route}
                >
                  Попробовать
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Agents */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Познакомьтесь с нашими AI-экспертами
            </h3>
            <p className="text-muted-foreground">
              Каждый агент имеет свою специализацию и уровень точности
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {aiAgents.map((agent, index) => (
              <div 
                key={agent.name}
                className="bg-background rounded-lg p-6 shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <agent.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{agent.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-xs text-success font-medium">
                        Точность {agent.confidence}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;