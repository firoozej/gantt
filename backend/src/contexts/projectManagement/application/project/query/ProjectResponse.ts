import { Response } from 'contexts/shared/domain/Response';
import { Project } from 'contexts/projectManagement/domain/Project';
import { Task } from 'contexts/projectManagement/domain/Task';

export class ProjectResponse extends Response {
    readonly id: string;
    readonly title: string;
    readonly start: string;
    readonly predictedEnd: string;
    readonly tasks: Array<Task>;

    constructor(project: Project) {
        super();
        this.id = project.id;
        this.title = project.title;
        this.start = project.start;
        this.predictedEnd = project.predictedEnd;
        this.tasks = project.tasks || [];
    }
}
