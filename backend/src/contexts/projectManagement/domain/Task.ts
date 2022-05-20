import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';

export class Task extends AggregateRoot {
    readonly id: string;
    readonly title: string;
    readonly duration: number;
    readonly start: string;
    readonly end: string;
    readonly children: Array<Task>;

    constructor(id: string, title: string, duration: number, start: string, end: string, children: Array<Task>) {
        super();
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.start = start;
        this.end = end;
        this.children = children || [];
    }
}
