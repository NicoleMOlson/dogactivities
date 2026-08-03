import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | undefined;
let browserClientPromise: Promise<SupabaseClient> | undefined;

interface PublicConfig {
  supabaseUrl: string;
  supabasePublishableKey: string;
}

async function loadPublicConfig(): Promise<PublicConfig> {
  const response = await fetch("/api/public-config", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Dogactivities Supabase public configuration is missing.");
  }

  const config = await response.json() as Partial<PublicConfig>;

  if (!config.supabaseUrl || !config.supabasePublishableKey) {
    throw new Error("Dogactivities Supabase public configuration is missing.");
  }

  return config as PublicConfig;
}

export async function getSupabaseClient(): Promise<SupabaseClient> {
  if (browserClient) return browserClient;
  if (browserClientPromise) return browserClientPromise;

  browserClientPromise = loadPublicConfig().then(({ supabaseUrl, supabasePublishableKey }) => {
    browserClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });

    return browserClient;
  }).catch((error) => {
    browserClientPromise = undefined;
    throw error;
  });

  return browserClientPromise;
}
