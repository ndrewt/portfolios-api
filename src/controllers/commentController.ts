import { Request, Response } from 'express';
import Comment from '../models/Comment';

interface ValueForParse {
    [key: string]: any;
}

export const addComment = async (req: Request, res: Response) => {
    try {
        const { content, imageId } = req.body;
        const userId = (req as any).userId;

        const comment = await Comment.create({ content, image_id: imageId, user_id: userId });
        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getList = async (req: Request, res: Response) => {
    try {
        const page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        let imageId = req.query.imageId;

        const where: ValueForParse = {};
        if (imageId) where['image_id'] = imageId;
        const countAllRows = await Comment.count({ where: where });

        if (countAllRows > 0) {
            if (Number(per_page) > countAllRows || per_page == 0) per_page = countAllRows;
            const offset = (Number(page) - 1) * Number(per_page);

            const images = await Comment.findAll({
                offset: offset,
                limit: Number(per_page),
                order: [['created_at', 'DESC']],
                where: where,
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

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        const comment = await Comment.findOne({ where: { id, user_id: userId } });

        if (!comment) {
            return res.status(404).json({ id: 0, error: true, errors: ['Comment not found or unauthorized'] });
        }

        await comment.destroy();
        res.status(200).json({ id, error: false, errors: [] });
    } catch (error) {
        res.status(500).json({ id: 0, error: true, errors: [(error as Error).message] });
    }
};
