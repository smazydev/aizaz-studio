declare module 'astro:env/server' {
	export const SANITY_PROJECT_ID: string;	
	export const SANITY_DATASET: string;	
	export const REVALIDATE_SECRET: string | undefined;	
	export const CLOUDFLARE_ZONE_ID: string | undefined;	
	export const CLOUDFLARE_API_TOKEN: string | undefined;	
}