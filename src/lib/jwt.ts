import jwt from "jsonwebtoken"

const secret = process.env["SECRET"]

if (!secret) throw new Error("Missing SECRET in env");

export function createToken(payload: {uid: number, username: string}){
    return jwt.sign(payload, secret!);
}

export function verifyToken(jwtToken: string){
    try{
        return jwt.verify(jwtToken, secret!) as {uid?: number, username?: string};
    }
    catch{
        return;
    }
}