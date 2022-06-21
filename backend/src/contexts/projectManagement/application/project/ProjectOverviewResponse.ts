import { Project } from 'contexts/projectManagement/domain/Project';
import { Response } from 'contexts/shared/domain/Response';
import { ProjectResponse } from './ProjectResponse';

export class ProjectOverviewResponse extends Response {
    readonly data: ProjectResponse[];
    readonly total: number;

    constructor(projects: Project[], total: number) {
        super();
        this.data = projects.map((p) => new ProjectResponse(p));
        this.total = total;
    }
}
