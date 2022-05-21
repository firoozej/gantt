export class ProjectRequest {
    readonly id: string;
    readonly includeTasks: boolean;

    constructor(id: string, includeTasks = true) {
        this.id = id;
        this.includeTasks = includeTasks;
    }
}
