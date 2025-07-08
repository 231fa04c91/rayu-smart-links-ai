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
    const url = new URL(req.url)
    const shortCode = url.pathname.split('/').pop()

    if (!shortCode) {
      return new Response('Not Found', { status: 404 })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the URL record
    const { data: urlRecord, error } = await supabaseClient
      .from('urls')
      .select('*')
      .eq('short_code', shortCode)
      .eq('is_active', true)
      .single()

    if (error || !urlRecord) {
      return new Response('Not Found', { status: 404 })
    }

    // Check if URL has expired
    if (urlRecord.expires_at && new Date(urlRecord.expires_at) < new Date()) {
      return new Response('Link Expired', { status: 410 })
    }

    // Record analytics
    const userAgent = req.headers.get('user-agent') || ''
    const referrer = req.headers.get('referer') || ''
    
    await supabaseClient
      .from('url_analytics')
      .insert({
        url_id: urlRecord.id,
        user_agent: userAgent,
        referrer: referrer,
        ip_address: req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || '',
      })

    // Redirect to original URL
    return new Response('', {
      status: 302,
      headers: {
        'Location': urlRecord.original_url,
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('Redirect error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
})