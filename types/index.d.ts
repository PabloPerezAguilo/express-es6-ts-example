export { }

declare global {
    namespace Express {
        export interface Request {
            // decoded token
            token: {
                id: string,
                role: string,
            };
        }
    }
}