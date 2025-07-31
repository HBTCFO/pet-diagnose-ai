import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Diagnose-Pet.AI</h3>
                <p className="text-xs text-muted-foreground">Забота с ИИ</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Революционная платформа для ветеринарной диагностики с использованием 
              искусственного интеллекта.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/photo" className="text-muted-foreground hover:text-foreground transition-colors">Диагностика по фото</a></li>
              <li><a href="/labs" className="text-muted-foreground hover:text-foreground transition-colors">Анализ PDF</a></li>
              <li><a href="/imaging" className="text-muted-foreground hover:text-foreground transition-colors">Радиология</a></li>
              <li><a href="/combo" className="text-muted-foreground hover:text-foreground transition-colors">Комплексная диагностика</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Поддержка</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Контакты</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Обучение</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API документация</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">support@diagnose-pet.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">+7 (800) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Москва, Россия</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Facebook className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Instagram className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Diagnose-Pet.AI. Все права защищены.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Условия использования
            </a>
            <a href="/legal/consent" className="text-muted-foreground hover:text-foreground transition-colors">
              GDPR
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 p-4 bg-muted/20 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            ⚖️ Важно: Diagnose-Pet.AI предоставляет предварительную диагностику и не заменяет 
            профессиональную ветеринарную помощь. Всегда консультируйтесь с лицензированным ветеринаром 
            для окончательного диагноза и лечения.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;