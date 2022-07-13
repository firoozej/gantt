import { Query } from 'contexts/shared/domain/Query';
import { Pagination } from '../../Pagination';

export class ProjectsQuery extends Query {
    readonly pagination: Pagination;
    constructor(pagination: Pagination) {
        super();
        this.pagination = pagination;
    }
}
