import { Command } from 'contexts/shared/domain/Command';

type Params = {
    id: string;
    title: string;
    start: string;
    predictedEnd: string;
};

export class UpdateProjectCommand extends Command {
    id: string;
    title: string;
    start: string;
    predictedEnd: string;

    constructor({ id, title, start, predictedEnd }: Params) {
        super();
        this.id = id;
        this.title = title;
        this.start = start;
        this.predictedEnd = predictedEnd;
    }
}
