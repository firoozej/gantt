import { Response } from 'contexts/shared/domain/Response';
import { Project } from '../domain/Project';
import { Task } from '../domain/Task';

export class ProjectResponse extends Response {
    readonly id: string;
    readonly title: string;
    readonly start: string;
    readonly end: string;
    readonly tasks: Array<Task>;

    constructor(project: Project) {
        super();
        this.id = project.id;
        this.title = project.title;
        this.start = project.start;
        this.end = project.end;
        this.tasks = project.tasks || [];
    }
}
