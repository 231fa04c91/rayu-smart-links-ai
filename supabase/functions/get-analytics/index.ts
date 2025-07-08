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

    // Get URLs with analytics
    const { data: urls, error: urlsError } = await supabaseClient
      .from('urls')
      .select(`
        *,
        url_analytics(*)
      `)
      .order('created_at', { ascending: false })

    if (urlsError) {
      return new Response(
        JSON.stringify({ error: urlsError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Process analytics data
    const processedUrls = urls?.map(url => ({
      ...url,
      totalClicks: url.url_analytics?.length || 0,
      recentClicks: url.url_analytics?.filter((click: any) => {
        const clickDate = new Date(click.clicked_at)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return clickDate >= weekAgo
      }).length || 0
    })) || []

    // Get overall stats
    const totalUrls = urls?.length || 0
    const totalClicks = urls?.reduce((sum, url) => sum + (url.url_analytics?.length || 0), 0) || 0
    const activeUrls = urls?.filter(url => url.is_active).length || 0

    return new Response(
      JSON.stringify({
        urls: processedUrls,
        stats: {
          totalUrls,
          totalClicks,
          activeUrls
        }
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