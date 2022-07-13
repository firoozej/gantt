export class Pagination {
    readonly pageSize: number;
    readonly pageNumber: number;

    constructor(pageSize: number, pageNumber: number) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }
}
