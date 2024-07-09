import { Request, Response } from 'express';
import Image from '../models/Image';
import Portfolio from '../models/Portfolio';

export const getFeed = async (req: Request, res: Response) => {
    try {
        const page = req.query.page || 1;
        let per_page = req.query.per_page || 10;

        const countAllRows = await Image.count();

        if (countAllRows > 0) {
            if (Number(per_page) > countAllRows || per_page == 0) per_page = countAllRows;
            const offset = (Number(page) - 1) * Number(per_page);

            const images = await Image.findAll({
                offset: offset,
                limit: Number(per_page),
                include: {
                    model: Portfolio,
                    attributes: ['name'],
                },
                order: [['created_at', 'DESC']],
            });
            res.status(200).json({
                page: Number(page),
                all_pages: Math.ceil(countAllRows / Number(per_page)),
                per_page: Number(per_page),
                all_rows: countAllRows,
                rows: images,
                error: false,
                errors: [],
            });
        } else
            res.status(200).json({
                page: 1,
                all_pages: 1,
                per_page: Number(per_page),
                all_rows: countAllRows,
                rows: [],
                error: false,
                errors: [],
            });
    } catch (error) {
        res.status(500).json({ page: 1, all_pages: 1, per_page: 1, all_rows: 0, rows: [], error: true, errors: [(error as Error).message] });
    }
};
