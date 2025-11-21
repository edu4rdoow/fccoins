import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ConversionEvent {
  eventName: string;
  eventSourceUrl: string;
  userAgent: string;
  clientIpAddress: string;
  fbp?: string;
  fbc?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { eventName, eventSourceUrl, userAgent, clientIpAddress, fbp, fbc }: ConversionEvent = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: config } = await supabase
      .from('facebook_config')
      .select('pixel_ids, conversion_api_token')
      .maybeSingle();

    if (!config || !config.pixel_ids || config.pixel_ids.length === 0 || !config.conversion_api_token) {
      return new Response(
        JSON.stringify({ error: 'Facebook credentials not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: eventSourceUrl,
          action_source: 'website',
          user_data: {
            client_ip_address: clientIpAddress,
            client_user_agent: userAgent,
            fbp: fbp,
            fbc: fbc,
          },
        },
      ],
    };

    const results = await Promise.all(
      config.pixel_ids.map(async (pixelId: string) => {
        const response = await fetch(
          `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${config.conversion_api_token}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
          }
        );
        return await response.json();
      })
    );

    return new Response(
      JSON.stringify({ success: true, results }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
