import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ProjectRepository } from 'contexts/projectManagement/domain/interface/ProjectRepository';
import { ProjectsQuery } from './ProjectsQuery';
import { ProjectOverviewResponse } from '../ProjectOverviewResponse';

export class ProjectsQueryHandler implements QueryHandler<ProjectsQuery, ProjectOverviewResponse> {
    constructor(private projectRepository: ProjectRepository) {}

    subscribedTo(): Query {
        return ProjectsQuery;
    }
    async handle(): Promise<ProjectOverviewResponse> {
        const projects = await this.projectRepository.findAll();
        const total = await this.projectRepository.count();
        return new ProjectOverviewResponse(projects, total);
    }
}
