export class ResourceNotExistError extends Error {
    constructor(message: string) {
        super(message);
    }
}
