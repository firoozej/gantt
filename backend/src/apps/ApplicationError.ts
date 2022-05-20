export class ApplicationError {
    public message: string;
    public status: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }
}
