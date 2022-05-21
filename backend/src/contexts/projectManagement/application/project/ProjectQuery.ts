import { Query } from 'contexts/shared/domain/Query';

export class ProjectQuery extends Query {
    readonly id: string;
    constructor(id: string) {
        super();
        this.id = id;
    }
}
