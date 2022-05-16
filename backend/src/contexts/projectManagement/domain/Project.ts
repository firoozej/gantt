import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';

export class Project extends AggregateRoot {
    readonly id: string;
    readonly title: string;
    readonly start: string;
    readonly end: string;
    readonly tasks: Array<string>;

    constructor(id: string, title: string, start: string, end: string, tasks: Array<string>) {
        super();
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.tasks = tasks || [];
    }
}
