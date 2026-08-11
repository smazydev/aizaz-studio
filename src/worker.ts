import type { SSRManifest } from 'astro';
import { App } from 'astro/app';
import { handle } from '@astrojs/cloudflare/handler';
import { publishDueScheduledPosts } from './lib/blog-db';

type Env = {
    DB: D1Database;
};

export function createExports(manifest: SSRManifest) {
    const app = new App(manifest);
    return {
        default: {
            async fetch(request: Request, env: Env, ctx: ExecutionContext) {
                return handle(manifest, app, request, env, ctx);
            },
            async scheduled(_controller: ScheduledController, env: Env, _ctx: ExecutionContext) {
                if (!env.DB) return;
                await publishDueScheduledPosts(env.DB);
            },
        },
    };
}
