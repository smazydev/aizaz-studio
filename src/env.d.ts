/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_GA_ID?: string;
    readonly SANITY_PROJECT_ID?: string;
    readonly SANITY_DATASET?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
