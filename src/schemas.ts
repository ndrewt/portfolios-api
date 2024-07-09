import Joi, { ObjectSchema } from 'joi';

//default
const getOnlyIdSchema = Joi.object({
    id: Joi.number().min(1).integer().required(),
}).options({ allowUnknown: true });

const getListSchema = Joi.object({
    page: Joi.number().min(1).integer(),
    per_page: Joi.number().min(0).integer().allow(0),
}).options({ allowUnknown: true });

//users
const signupSchema = Joi.object({
    username: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().min(1).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
}).options({ allowUnknown: true });

const loginSchema = Joi.object({
    email: Joi.string().email().min(1).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
}).options({ allowUnknown: true });

const getUserDetailsByIdSchema = Joi.object({
    userId: Joi.number().min(1).integer().required(),
}).options({ allowUnknown: true });

//portfolios

const addPortfolioSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(255).required(),
}).options({ allowUnknown: true });

//images
const addImageSchema = Joi.object({
    portfolioId: Joi.number().min(1).required().integer(),
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(255),
    file: Joi.object({
        fieldname: Joi.string().max(255),
        originalname: Joi.string().max(255),
        encoding: Joi.string().max(255),
        mimetype: Joi.string().max(255).valid('image/png', 'image/jpeg', 'image/svg+xml'),
        size: Joi.number(),
        buffer: Joi.binary(),
    }).required(),
}).options({ allowUnknown: true });

//comments
const addCommentSchema = Joi.object({
    content: Joi.string().min(1).max(255).required(),
    imageId: Joi.number().min(1).required().integer(),
}).options({ allowUnknown: true });

const getCommentsListSchema = Joi.object({
    page: Joi.number().min(1).integer(),
    per_page: Joi.number().min(0).integer().allow(0),
    imageId: Joi.number().min(1).integer(),
}).options({ allowUnknown: true });

export default {
    //general
    '/get-only-id': getOnlyIdSchema,
    '/get-list': getListSchema,

    //users
    '/signup': signupSchema,
    '/login': loginSchema,
    '/get-user-details': getUserDetailsByIdSchema,

    // portfolios
    '/portfolios/add': addPortfolioSchema,

    // images
    '/images/add': addImageSchema,

    //  comments
    '/comments/add': addCommentSchema,
    '/comments/list': getCommentsListSchema,
} as { [key: string]: ObjectSchema };
