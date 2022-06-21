import { Response } from 'contexts/shared/domain/Response';
import { Project } from 'contexts/projectManagement/domain/Project';
import { Task } from 'contexts/projectManagement/domain/Task';

export class ProjectResponse extends Response {
    readonly id: string;
    readonly title: string;
    readonly start: string;
    readonly predictedEnd: string | null;
    readonly tasks: Array<Task>;

    constructor(project: Project) {
        super();
        this.id = project.id;
        this.title = project.title;
        this.start = project.start.toISOString();
        this.predictedEnd = project.predictedEnd ? project.predictedEnd.toISOString() : null;
        this.tasks = project.tasks || [];
    }
}
