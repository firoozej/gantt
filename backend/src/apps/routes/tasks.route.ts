import { Router, Request, Response } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
    const projectController = container.get('Apps.projectManagment.controllers.ProjectController');
    router.get('/project/:id', (req: Request, res: Response) => projectController.run('project', req, res));
};
