declare module 'astro:env/client' {
	export const PUBLIC_TURNSTILE_SITE_KEY: string | undefined;	
	export const PUBLIC_GOOGLE_ADS_SEND_TO: string | undefined;	
}declare module 'astro:env/server' {
	export const SANITY_PROJECT_ID: string;	
	export const SANITY_DATASET: string;	
	export const REVALIDATE_SECRET: string | undefined;	
	export const TURNSTILE_SECRET_KEY: string | undefined;	
	export const TURNSTILE_PREVIEW_HOST: string | undefined;	
	export const CLOUDFLARE_ZONE_ID: string | undefined;	
	export const CLOUDFLARE_API_TOKEN: string | undefined;	
}