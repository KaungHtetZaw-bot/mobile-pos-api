import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body
    if( !email || !password ) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jwt.sign(
            {id:user.id,email:user.email},
            JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.status(200).json({
            message: "Login successful",
            token,
            user: user
        });

    } catch (error) {
        res.status(500).json({ error: "Login failed internal server error" });
    }
}

export const register = async ( req: Request, res: Response ) => {
    const { roleId = 3, name, username, email, phone, password, status } = req.body
    if( !name || !username || !email || !password ) {
        res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "Email is already registered" });
            return;
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                phone,
                status: status || "ACTIVE",
                role: {
                    connect: { id: Number(roleId) }
                }
            },
        });
        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ error: "Login failed internal server error" });
    }
}