import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { Task } from './Task';

export class Project extends AggregateRoot {
    readonly id: string;
    readonly title: string;
    readonly start: Date;
    readonly predictedEnd: Date;
    readonly tasks: Array<Task>;

    constructor(id: string, title: string, start: Date, predictedEnd: Date, tasks: Array<Task>) {
        super();
        this.id = id;
        this.title = title;
        this.start = start;
        this.predictedEnd = predictedEnd;
        this.tasks = tasks || [];
    }
}
