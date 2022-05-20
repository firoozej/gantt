import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { Task } from './Task';

export class Project extends AggregateRoot {
    readonly id: string;
    readonly title: string;
    readonly start: string;
    readonly end: string;
    readonly tasks: Array<Task>;

    constructor(id: string, title: string, start: string, end: string, tasks: Array<Task>) {
        super();
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.tasks = tasks || [];
    }
}