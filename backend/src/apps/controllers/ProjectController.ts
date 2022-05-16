import { Controller } from './Controller';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { QueryBus } from 'contexts/shared/domain/QueryBus';
import { ProjectQuery } from 'contexts/projectManagement/application/ProjectQuery';
import { ProjectResponse } from 'contexts/projectManagement/application/ProjectResponse';
import { ResourceNotExistError } from 'contexts/shared/domain/ResourceNotExistError';

export class ProjectController implements Controller {
    constructor(private queryBus: QueryBus) {}
    async run(method: string, req: Request, res: Response): Promise<void> {
        switch (method) {
            case 'project':
                this.project(req, res);
        }
    }
    async project(req: Request, res: Response) {
        try {
            const query = new ProjectQuery(req.body.id);
            const project = await this.queryBus.ask<ProjectResponse>(query);

            res.status(httpStatus.OK).send(project);
        } catch (e) {
            if (e instanceof ResourceNotExistError) {
                res.status(httpStatus.NOT_FOUND).send();
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            }
        }
    }
}
