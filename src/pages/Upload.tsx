import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, X, AlertTriangle, FileImage, FileText, Camera } from "lucide-react";
import Header from "@/components/Header";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [panicMode, setPanicMode] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles].slice(0, 10));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
      'application/dicom': ['.dcm']
    },
    maxFiles: 10
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="w-4 h-4" />;
    if (file.type === 'application/pdf') return <FileText className="w-4 h-4" />;
    return <Camera className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Загрузка файлов для диагностики
            </h1>
            <p className="text-muted-foreground">
              Загрузите фото питомца, PDF-анализы или медицинские снимки
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="space-y-6">
              {/* Panic Mode Toggle */}
              <Card className="p-4 border-panic/20 bg-panic/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-panic" />
                    <div>
                      <h3 className="font-semibold text-foreground">Панический режим</h3>
                      <p className="text-sm text-muted-foreground">Экстренная диагностика без анкеты</p>
                    </div>
                  </div>
                  <Button
                    variant={panicMode ? "panic" : "outline"}
                    size="sm"
                    onClick={() => setPanicMode(!panicMode)}
                  >
                    {panicMode ? "Выключить" : "Включить"}
                  </Button>
                </div>
              </Card>

              {/* Drop Zone */}
              <Card className="p-8">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
                >
                  <input {...getInputProps()} />
                  <UploadIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  
                  {isDragActive ? (
                    <p className="text-primary font-medium">Отпустите файлы здесь...</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-foreground font-medium">
                        Перетащите файлы сюда или нажмите для выбора
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Поддерживаются: JPEG, PNG, PDF, DICOM (до 10 файлов)
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* File List */}
              {files.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-semibold text-foreground mb-4">
                    Загруженные файлы ({files.length}/10)
                  </h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="text-sm font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Form / Info */}
            <div className="space-y-6">
              {!panicMode ? (
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Информация о питомце</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Вид животного
                      </label>
                      <select className="w-full p-3 border border-input rounded-lg bg-background">
                        <option>Собака</option>
                        <option>Кошка</option>
                        <option>Другое</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Возраст
                      </label>
                      <input 
                        type="text" 
                        placeholder="Например: 2 года"
                        className="w-full p-3 border border-input rounded-lg bg-background"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Симптомы
                      </label>
                      <textarea 
                        placeholder="Опишите что беспокоит питомца..."
                        rows={3}
                        className="w-full p-3 border border-input rounded-lg bg-background resize-none"
                      />
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 border-panic/20 bg-panic/5">
                  <div className="text-center space-y-4">
                    <AlertTriangle className="w-12 h-12 text-panic mx-auto" />
                    <h3 className="font-semibold text-foreground">Панический режим активен</h3>
                    <p className="text-sm text-muted-foreground">
                      Анкета скрыта для быстрой диагностики. Мы проанализируем файлы 
                      и предоставим экстренные рекомендации.
                    </p>
                  </div>
                </Card>
              )}

              {/* Legal Consent */}
              <Card className="p-4 bg-muted/20">
                <div className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-xs text-muted-foreground">
                    Я согласен с{" "}
                    <a href="/legal/terms" className="text-primary underline">условиями использования</a>
                    {" "}и понимаю, что это предварительная диагностика, 
                    не заменяющая визит к ветеринару.
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  variant={panicMode ? "panic" : "hero"} 
                  size="lg" 
                  className="w-full"
                  disabled={files.length === 0}
                >
                  {panicMode ? "Экстренный анализ" : "Начать диагностику"}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Анализ займёт 30-60 секунд
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;