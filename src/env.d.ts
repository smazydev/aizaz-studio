/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Env {
    DB: D1Database;
    BLOG_IMAGES?: R2Bucket;
    ADMIN_PASSWORD: string;
    SESSION_SECRET: string;
    CRON_SECRET: string;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
    interface Locals extends Runtime {}
}

interface ImportMetaEnv {
    readonly PUBLIC_GA_ID?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
