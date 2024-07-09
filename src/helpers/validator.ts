import Joi, { ValidationResult, object } from 'joi';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import schemas from '../schemas';

interface SchemaKeys {
    key: string;
    schema: object;
}

export const schemaValidator = (path: string, getMode: 'query' | 'body' | 'params' | 'file', filterBody = false, validateFile: boolean = false) => {
    const schema = schemas[path];

    if (!schema) {
        throw new Error(`Schema not found for path: ${path}`);
    }

    return (req: Request, res: Response, next: NextFunction) => {
        let body: { [key: string]: any } = {};
        if (getMode === 'body') body = req.body;
        else if (getMode === 'query') body = req.query;
        else if (getMode === 'params') body = req.params;
        if (validateFile && req.file) body.file = req.file;

        const { error, value } = schema.validate(body, { abortEarly: false });
        if (error) {
            let errors: { [key: string]: any } = [];

            error.details.forEach((el: any) => {
                let name = el.path;
                errors.push({
                    [name]: [el.message],
                });
            });
            return res.status(422).json({
                error: true,
                errors: errors,
            });
        } else {
            if (filterBody == true) {
                for (let key in body) {
                    const found = schema['$_terms']['keys'].find((obj: SchemaKeys) => obj.key === key);
                    if (!found) delete body[key];
                }
            }
        }
        return next();
    };
};
