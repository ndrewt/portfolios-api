import { Request, Response } from 'express';
import Portfolio from '../models/Portfolio';
import Image from '../models/Image';
import { delete_file } from '../helpers/dataHelper';

export const createPortfolio = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const userId = (req as any).userId;
        const portfolio = await Portfolio.create({ name, description, user_id: userId });
        res.status(201).json({ id: portfolio.dataValues.id, error: false, errors: [], rows: portfolio });
    } catch (error) {
        res.status(500).json({ id: 0, error: true, errors: [(error as Error).message] });
    }
};

export async function getList(req: Request, res: Response) {
    try {
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;

        const countAllRows = await Portfolio.count();

        if (countAllRows > 0) {
            if (Number(per_page) > countAllRows || per_page == 0) per_page = countAllRows;
            const offset = (Number(page) - 1) * Number(per_page);
            const allRows = await Portfolio.findAll({
                offset: offset,
                limit: Number(per_page),
                subQuery: false,
            });

            if (allRows.length > 0) {
                return res.status(200).json({
                    page: Number(page),
                    all_pages: Math.ceil(countAllRows / Number(per_page)),
                    per_page: Number(per_page),
                    all_rows: countAllRows,
                    rows: allRows,
                });
            } else {
                return res.status(200).json({
                    page: Number(page),
                    all_pages: 0,
                    per_page: Number(per_page),
                    all_rows: 0,
                    rows: [],
                });
            }
        } else {
            return res.status(200).json({
                page: Number(page),
                all_pages: 0,
                per_page: Number(per_page),
                all_rows: 0,
                rows: [],
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            errors: ['Server-side error. It may be because "where" or "order" object from request has an invalid key(`s) '],
        });
    }
}

export const deletePortfolio = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const portfolioId = req.params.id;
        const portfolio = await Portfolio.findOne({ where: { id: portfolioId, user_id: userId } });

        if (!portfolio) {
            return res.status(404).json({ id: 0, error: true, errors: ['Portfolio not found or unauthorized'] });
        }
        const foundImages = await Image.findAll({ where: { portfolio_id: portfolioId } });
        for (let image of foundImages) {
            if (image.dataValues.image != null && image.dataValues.image != '') delete_file('images/' + image.dataValues.image);
        }

        await portfolio.destroy();
        res.status(200).json({ id: portfolio.dataValues.id, error: false, errors: [] });
    } catch (error) {
        res.status(500).json({ id: 0, error: true, errors: [(error as Error).message] });
    }
};
