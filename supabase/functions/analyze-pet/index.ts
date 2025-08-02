import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting pet analysis request');
    
    const { files, petInfo, panicMode } = await req.json();
    
    if (!files || files.length === 0) {
      throw new Error('No files provided for analysis');
    }

    console.log('Pet info:', petInfo);
    console.log('Files count:', files.length);
    console.log('Panic mode:', panicMode);

    // Prepare the message content
    const messageContent = [];
    
    // Add text prompt
    const prompt = `Ты ветеринарный специалист. Проанализируй следующий случай с питомцем:

Информация о питомце:
- Вид: ${petInfo.species || 'Не указан'}
- Возраст: ${petInfo.age || 'Не указан'}  
- Симптомы: ${petInfo.symptoms || 'Не указаны'}

${panicMode ? '🚨 ЭКСТРЕННЫЙ СЛУЧАЙ - ПАНИЧЕСКИЙ РЕЖИМ 🚨\nДай максимально быстрый и точный анализ для оказания неотложной помощи.' : ''}

Внимательно изучи предоставленные изображения и дай подробный анализ состояния животного, возможные диагнозы и рекомендации по лечению. Отвечай на русском языке.`;

    messageContent.push({
      type: 'text',
      text: prompt
    });

    // Add images directly as base64
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        messageContent.push({
          type: 'image_url',
          image_url: {
            url: file.data
          }
        });
      }
    }

    console.log('Calling OpenAI Chat Completions API...');
    
    // Call OpenAI Chat Completions API directly
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: messageContent
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${result.error?.message || 'Unknown error'}`);
    }

    const analysis = result.choices[0].message.content;
    console.log('Analysis completed successfully');

    return new Response(JSON.stringify({ 
      success: true,
      analysis,
      panicMode 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pet function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});