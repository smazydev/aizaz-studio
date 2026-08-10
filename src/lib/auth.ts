const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function toBase64Url(bytes: Uint8Array): string {
    let binary = '';
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): Uint8Array {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

async function sign(value: string, secret: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );
    const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
    return toBase64Url(new Uint8Array(signature));
}

async function createSessionToken(secret: string): Promise<string> {
    const payload = JSON.stringify({
        role: 'admin',
        exp: Date.now() + SESSION_MAX_AGE_MS,
    });
    const encodedPayload = toBase64Url(new TextEncoder().encode(payload));
    const signature = await sign(encodedPayload, secret);
    return `${encodedPayload}.${signature}`;
}

async function verifySessionToken(token: string | undefined, secret: string): Promise<boolean> {
    if (!token || !secret) return false;
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return false;

    const expected = await sign(encodedPayload, secret);
    if (expected !== signature) return false;

    try {
        const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encodedPayload))) as {
            role?: string;
            exp?: number;
        };
        return payload.role === 'admin' && typeof payload.exp === 'number' && payload.exp > Date.now();
    } catch {
        return false;
    }
}

export function getSessionCookie(request: Request): string | undefined {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return undefined;
    const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
    return match?.[1];
}

export async function isAuthenticated(request: Request, secret: string): Promise<boolean> {
    return verifySessionToken(getSessionCookie(request), secret);
}

export async function createSessionCookie(secret: string, secure: boolean): Promise<string> {
    const token = await createSessionToken(secret);
    const parts = [
        `${SESSION_COOKIE}=${token}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        `Max-Age=${Math.floor(SESSION_MAX_AGE_MS / 1000)}`,
    ];
    if (secure) parts.push('Secure');
    return parts.join('; ');
}

export function clearSessionCookie(secure: boolean): string {
    const parts = [`${SESSION_COOKIE}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
    if (secure) parts.push('Secure');
    return parts.join('; ');
}

export function verifyPassword(input: string, expected: string): boolean {
    if (!input || !expected) return false;
    if (input.length !== expected.length) return false;
    let mismatch = 0;
    for (let i = 0; i < input.length; i += 1) {
        mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return mismatch === 0;
}

export function getRuntimeEnv(locals: App.Locals): Env {
    return locals.runtime.env;
}

export function isSecureRequest(request: Request): boolean {
    const url = new URL(request.url);
    return url.protocol === 'https:' || url.hostname === 'localhost' || url.hostname === '127.0.0.1';
}
