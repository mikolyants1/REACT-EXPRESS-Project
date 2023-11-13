import { body, validationResult } from 'express-validator';
export const validUser = [
    body('name').notEmpty(),
    body('phone').isLength({ min: 3 })
];
export const validPhone = [
    body('name').notEmpty()
];
export const validMess = [
    body('text').notEmpty(),
    body('id').notEmpty()
];
export function check(req, res, next) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(404).json({ err: err.array() });
    }
    next();
}
