import { Query } from 'contexts/shared/domain/Query';

export class ProjectQuery extends Query {
    readonly id: string;
    readonly withTasks: boolean;
    constructor(id: string, withTasks = true) {
        super();
        this.id = id;
        this.withTasks = withTasks;
    }
}
