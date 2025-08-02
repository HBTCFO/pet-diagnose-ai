import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_ASSISTANT_ID = "asst_jhklPOpRLXgO8bzymiszDIg8";

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

    // Create a thread
    console.log('Creating OpenAI thread...');
    const threadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
      body: JSON.stringify({}),
    });

    const thread = await threadResponse.json();
    console.log('Thread created:', thread.id);

    // Prepare the message content
    let messageContent = `Please analyze the following pet diagnostic data:

Pet Information:
- Species: ${petInfo.species || 'Not specified'}
- Age: ${petInfo.age || 'Not specified'}
- Symptoms: ${petInfo.symptoms || 'Not specified'}

${panicMode ? '🚨 URGENT CASE - PANIC MODE ACTIVATED 🚨' : ''}

Files provided: ${files.length} file(s)
`;

    // Add file information
    files.forEach((file: any, index: number) => {
      messageContent += `\nFile ${index + 1}: ${file.name} (${file.type})`;
    });

    messageContent += '\n\nPlease provide a detailed analysis and recommendations.';

    // Add message to thread
    console.log('Adding message to thread...');
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
      body: JSON.stringify({
        role: 'user',
        content: messageContent,
      }),
    });

    const message = await messageResponse.json();
    console.log('Message added to thread');

    // Run the assistant
    console.log('Running assistant...');
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
      body: JSON.stringify({
        assistant_id: OPENAI_ASSISTANT_ID,
      }),
    });

    const run = await runResponse.json();
    console.log('Run started:', run.id);

    // Poll for completion
    let runStatus = run;
    const maxAttempts = 30; // Maximum 5 minutes (30 * 10 seconds)
    let attempts = 0;

    while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
      if (attempts >= maxAttempts) {
        throw new Error('Analysis timeout - please try again');
      }

      console.log(`Waiting for completion... Status: ${runStatus.status} (attempt ${attempts + 1})`);
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
      const statusResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2',
        },
      });

      runStatus = await statusResponse.json();
      attempts++;
    }

    console.log('Run completed with status:', runStatus.status);

    if (runStatus.status !== 'completed') {
      throw new Error(`Analysis failed with status: ${runStatus.status}`);
    }

    // Get the messages
    console.log('Fetching analysis results...');
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2',
      },
    });

    const messagesData = await messagesResponse.json();
    const assistantMessages = messagesData.data.filter((msg: any) => msg.role === 'assistant');

    if (assistantMessages.length === 0) {
      throw new Error('No analysis results received');
    }

    const analysis = assistantMessages[0].content[0].text.value;
    console.log('Analysis completed successfully');

    return new Response(JSON.stringify({ 
      success: true,
      analysis,
      threadId: thread.id,
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