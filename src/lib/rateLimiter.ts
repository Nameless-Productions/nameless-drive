import {RateLimiter} from "sveltekit-rate-limiter/server"

export const limiter = new RateLimiter({
    IP: [60, "m"],
    IPUA: [70, "m"]
})