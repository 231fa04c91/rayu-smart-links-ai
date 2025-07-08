import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { originalUrl, customAlias, userId } = await req.json()

    if (!originalUrl) {
      return new Response(
        JSON.stringify({ error: 'Original URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate or use custom short code
    let shortCode = customAlias
    if (!shortCode) {
      const { data: generatedCode } = await supabaseClient.rpc('generate_short_code')
      shortCode = generatedCode
    }

    // Check if short code already exists
    const { data: existing } = await supabaseClient
      .from('urls')
      .select('short_code')
      .eq('short_code', shortCode)
      .single()

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Short code already exists' }),
        { 
          status: 409, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Insert the URL
    const { data, error } = await supabaseClient
      .from('urls')
      .insert({
        original_url: originalUrl,
        short_code: shortCode,
        user_id: userId || null,
        custom_alias: customAlias || null
      })
      .select()
      .single()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        shortUrl: `${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/functions/v1/redirect/${shortCode}`,
        shortCode,
        originalUrl 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})