import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ResourceNotExistError } from 'contexts/shared/domain/ResourceNotExistError';
import { ProjectRepository } from 'contexts/projectManagement/domain/interface/ProjectRepository';
import { ProjectQuery } from './ProjectQuery';
import { ProjectResponse } from './ProjectResponse';

export class ProjectQueryHandler implements QueryHandler<ProjectQuery, ProjectResponse> {
    constructor(private projectRepository: ProjectRepository) {}

    subscribedTo(): Query {
        return ProjectQuery;
    }
    async handle(_query: ProjectQuery): Promise<ProjectResponse> {
        const project = await this.projectRepository.find(_query.id, false);
        if (!project) {
            throw new ResourceNotExistError('Project does not exist');
        }
        return new ProjectResponse(project);
    }
}
