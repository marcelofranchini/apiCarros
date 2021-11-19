import { NextFunction, Request, Response } from "express";
import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5, //5 requests
    duration: 5, // per 5 second by IP
});

async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await limiter.consume(request.ip);

        return next();
    } catch (err) {
        throw new AppError("Too Many Requests", 429);
    }
}

export default rateLimiter;
