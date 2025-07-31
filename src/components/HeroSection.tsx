import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">
                  AI-диагностика нового поколения
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Здоровье вашего
                <span className="text-transparent bg-gradient-primary bg-clip-text"> питомца </span>
                под контролем ИИ
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                Получите предварительную ветеринарную диагностику за минуты. 
                Анализ фото, лабораторных данных и снимков с помощью 
                современных AI-агентов.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.5%</div>
                <div className="text-sm text-muted-foreground">Точность</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">&lt;60с</div>
                <div className="text-sm text-muted-foreground">Скорость</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Доступность</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => window.location.href = '/upload'}
              >
                Начать диагностику
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="panic" 
                size="xl" 
                className="group"
                onClick={() => window.location.href = '/upload?panic=true'}
              >
                <Zap className="w-5 h-5 mr-2" />
                Панический режим
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">GDPR защита</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Мгновенный результат</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:order-last animate-float">
            <div className="relative">
              <img
                src={heroImage}
                alt="Дружелюбные питомцы - кот и собака"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-card animate-pulse-glow">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI анализирует...</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-card">
                <div className="text-sm font-medium text-foreground">🐕 Диагноз готов!</div>
                <div className="text-xs text-muted-foreground">Доверие: 98.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;