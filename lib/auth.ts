import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret';

export async function encrypt(payload: any) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function decrypt(token: string) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded; // Returns the decoded payload if the token is valid
    } catch (error) {
        console.error('Token verification failed:', error);
        return null; // Returns null if the token is invalid or expired
    }
}