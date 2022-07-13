import httpStatus from 'http-status';
import { QueryBus } from 'contexts/shared/domain/QueryBus';
import { ProjectQuery } from 'contexts/projectManagement/application/project/query/ProjectQuery';
import { ProjectResponse } from 'contexts/projectManagement/application/project/ProjectResponse';
import { ResourceNotExistError } from 'contexts/shared/domain/ResourceNotExistError';
import { ApplicationError } from 'apps/ApplicationError';
import { ProjectsQuery } from 'contexts/projectManagement/application/project/query/ProjectsQuery';
import { ProjectRequest } from 'contexts/projectManagement/application/project/query/ProjectReuest';
import { CommandBus } from 'contexts/shared/domain/CommandBus';
import { CreateProjectCommand } from 'contexts/projectManagement/application/project/command/CreateProjectCommand';
import { UpdateProjectCommand } from 'contexts/projectManagement/application/project/command/UpdateProjectCommand';
import { ProjectOverviewResponse } from 'contexts/projectManagement/application/project/ProjectOverviewResponse';
import { Pagination } from 'contexts/projectManagement/application/Pagination';

export class ProjectController {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

    async project(args: ProjectRequest): Promise<ProjectResponse> {
        try {
            const query = new ProjectQuery(args.id);
            return await this.queryBus.ask<ProjectResponse>(query);
        } catch (e: any) {
            if (e instanceof ResourceNotExistError) {
                throw new ApplicationError('Project Not Found', httpStatus.NOT_FOUND);
            } else {
                throw new ApplicationError(e.message, httpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async projects(pagination: Pagination): Promise<ProjectOverviewResponse> {
        try {
            const query = new ProjectsQuery(pagination);
            return await this.queryBus.ask<ProjectOverviewResponse>(query);
        } catch (e: any) {
            throw new ApplicationError(e.message, httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(args: any): Promise<ProjectResponse> {
        try {
            const command = new CreateProjectCommand(args);
            return await this.commandBus.dispatch(command);
        } catch (e: any) {
            throw new ApplicationError(e.message, httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(args: any): Promise<ProjectResponse> {
        try {
            const command = new UpdateProjectCommand(args);
            return await this.commandBus.dispatch(command);
        } catch (e: any) {
            throw new ApplicationError(e.message, httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
