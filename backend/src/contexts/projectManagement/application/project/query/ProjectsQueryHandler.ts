import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ProjectRepository } from 'contexts/projectManagement/domain/interface/ProjectRepository';
import { Project } from 'contexts/projectManagement/domain/Project';
import { ProjectResponse } from './ProjectResponse';
import { ProjectsQuery } from './ProjectsQuery';

export class ProjectsQueryHandler implements QueryHandler<ProjectsQuery, Array<ProjectResponse>> {
    constructor(private projectRepository: ProjectRepository) {}

    subscribedTo(): Query {
        return ProjectsQuery;
    }
    async handle(): Promise<Array<ProjectResponse>> {
        const projects = await this.projectRepository.findAll();
        return projects.map((project: Project) => new ProjectResponse(project));
    }
}
