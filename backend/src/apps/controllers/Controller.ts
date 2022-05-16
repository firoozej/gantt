import { Request, Response } from 'express';

export interface Controller {
    run(method: string, req: Request, res: Response): Promise<void>;
}
