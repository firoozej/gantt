import { Command } from 'contexts/shared/domain/Command';

type Params = {
    title: string;
    start: string;
    predictedEnd: string;
};

export class CreateProjectCommand extends Command {
    title: string;
    start: string;
    predictedEnd: string;

    constructor({ title, start, predictedEnd }: Params) {
        super();
        this.title = title;
        this.start = start;
        this.predictedEnd = predictedEnd;
    }
}
