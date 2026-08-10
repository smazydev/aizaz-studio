import type { ScheduledController, ExecutionContext } from '@cloudflare/workers-types';
import { publishDueScheduledPosts } from './lib/blog-db';

type Env = {
    DB: D1Database;
};

export async function scheduled(
    _controller: ScheduledController,
    env: Env,
    _ctx: ExecutionContext,
): Promise<void> {
    if (!env.DB) return;
    await publishDueScheduledPosts(env.DB);
}
