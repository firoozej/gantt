import httpStatus from 'http-status';
import { QueryBus } from 'contexts/shared/domain/QueryBus';
import { ProjectQuery } from 'contexts/projectManagement/application/project/ProjectQuery';
import { ProjectResponse } from 'contexts/projectManagement/application/ProjectResponse';
import { ResourceNotExistError } from 'contexts/shared/domain/ResourceNotExistError';
import { ApplicationError } from 'apps/ApplicationError';
import { ProjectsQuery } from 'contexts/projectManagement/application/ProjectsQuery';
import { ProjectRequest } from 'contexts/projectManagement/application/ProjectReuest';

export class ProjectController {
    constructor(private queryBus: QueryBus) {}

    async project(args: ProjectRequest): Promise<ProjectResponse> {
        try {
            const query = new ProjectQuery(args.id);
            return await this.queryBus.ask<ProjectResponse>(query);
        } catch (e) {
            if (e instanceof ResourceNotExistError) {
                throw new ApplicationError('Project Not Found', httpStatus.NOT_FOUND);
            } else {
                throw new ApplicationError('Error', httpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async projects(): Promise<Array<ProjectResponse>> {
        try {
            const query = new ProjectsQuery();
            return await this.queryBus.ask<Array<ProjectResponse>>(query);
        } catch (e) {
            throw new ApplicationError('Error', httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
