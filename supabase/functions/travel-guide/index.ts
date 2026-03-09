import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { city, place, time } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const timeContext = time ? ` They plan to visit during: ${time}.` : "";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert solo female travel safety advisor. Given a destination city and specific place, provide a comprehensive travel confidence guide. Always be encouraging while being honest about safety. Focus on empowerment, not fear. Return JSON with exactly these keys: safety, bestTimes, transportation, tips. Each value should be 3-5 sentences of practical, specific advice. Do not use markdown formatting in the values.`,
          },
          {
            role: "user",
            content: `City: ${city}. Place: ${place}.${timeContext} Provide a Travel Confidence Guide for a solo female traveler.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "travel_guide",
              description: "Return a structured travel confidence guide",
              parameters: {
                type: "object",
                properties: {
                  safety: { type: "string", description: "Safety considerations for solo female travelers" },
                  bestTimes: { type: "string", description: "Best times to visit this specific place" },
                  transportation: { type: "string", description: "Transportation and logistics advice" },
                  tips: { type: "string", description: "Practical tips for solo female travelers" },
                },
                required: ["safety", "bestTimes", "transportation", "tips"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "travel_guide" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in your workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const guide = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ ...guide, city, place }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("travel-guide error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
