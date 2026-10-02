import fetch from 'node-fetch';

const SITEVERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(response, secret, remoteIp) {
    if (!response) {
        return false;
    }

    const body = new URLSearchParams({ secret, response });
    if (remoteIp) {
        body.set("remoteip", remoteIp);
    }

    try {
        const result = await fetch(SITEVERIFY_ENDPOINT, {
            method: "POST",
            body
        });

        const data = await result.json();
        if (!data.success) {
            console.log(`Turnstile verification failed: ${JSON.stringify(data["error-codes"])}`);
        }

        return data.success === true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
