const config = require('../../config');
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Op } from 'sequelize';

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const foundUserCount = await User.count({
            where: {
                [Op.or]: [{ email: email }, { username: username }],
            },
        });
        if (foundUserCount > 0) return res.status(409).json({ error: true, errors: ['User already exists by email or username'] });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ error: false, message: 'User created successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, errors: [(error as Error).message] });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: true, errors: ['Invalid email or password'] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: true, errors: ['Invalid email or password'] });
        }
        const token = jwt.sign({ userId: user.id }, config.jwt_secret, { expiresIn: '1d' });
        res.status(200).json({ error: false, token });
    } catch (error) {
        res.status(500).json({ error: true, errors: [(error as Error).message] });
    }
};

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;
        const found = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'username', 'email'],
        });

        res.status(200).json({ rows: found, error: false, errors: [] });
    } catch (error) {
        res.status(500).json({ id: 0, error: true, errors: [(error as Error).message] });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        await User.destroy({ where: { id: userId } });
        res.status(200).json({ id: userId, error: false, errors: ['User deleted successfully'] });
    } catch (error) {
        res.status(500).json({ id: 0, error: true, errors: [(error as Error).message] });
    }
};
