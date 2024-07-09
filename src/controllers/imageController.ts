import { Request, Response } from 'express';
import Image from '../models/Image';
import Portfolio from '../models/Portfolio';
import multer from 'multer';
import fs from 'fs';
import { generateFileName, save_file, delete_file } from '../helpers/dataHelper';

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const { name, description, portfolioId } = req.body;
        const userId = (req as any).userId;

        const portfolio = await Portfolio.findOne({ where: { id: portfolioId, user_id: userId } });
        if (!portfolio) {
            return res.status(404).json({ id: 0, error: true, errors: ['Portfolio not found or unauthorized'] });
        }

        let fileName = '';
        if (req.file) fileName = generateFileName(req.file);

        const image = await Image.create({
            name,
            description,
            portfolio_id: portfolioId,
            image: fileName,
        });

        if (req.file) save_file(fileName, req.file);
        res.status(201).json({ id: image.dataValues.id, error: false, errors: [], rows: image });
    } catch (error) {
        console.log(error);
        res.status(500).json({ id: 0, error: true, errors: [(error as Error).message] });
    }
};

//return images from local
export const getImageLocal = (req: Request, res: Response) => {
    const filename = req.params.filename;

    res.sendFile(filename, { root: './images' }, (err) => {
        if (err) {
            // console.log(err)
            return res.status(404).json({
                error: true,
                errors: ['Not Found'],
            });
        }
    });
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        const image = await Image.findOne({ where: { id }, include: { model: Portfolio, where: { user_id: userId } } });

        if (!image) {
            return res.status(404).json({ id, error: true, errors: ['Image not found or unauthorized'] });
        }

        if (image.dataValues.image != null && image.dataValues.image != '') delete_file('images/' + image.dataValues.image);
        await image.destroy();
        res.status(200).json({ id, error: false, errors: [] });
    } catch (error) {
        res.status(500).json({ id: 0, error: true, errors: [(error as Error).message] });
    }
};
