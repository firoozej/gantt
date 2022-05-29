import { ProjectRepository } from 'contexts/projectManagement/domain/interface/ProjectRepository';
import { Command } from 'contexts/shared/domain/Command';
import { CommandHandler } from 'contexts/shared/domain/CommandHandler';
import { ProjectResponse } from '../query/ProjectResponse';
import { CreateProjectCommand } from './CreateProjectCommand';

export class CreateProjectCommandHandler implements CommandHandler<CreateProjectCommand> {
    constructor(private projectRepository: ProjectRepository) {}

    subscribedTo(): Command {
        return CreateProjectCommand;
    }

    async handle(command: CreateProjectCommand): Promise<ProjectResponse> {
        const project = await this.projectRepository.save({
            title: command.title,
            start: new Date(command.start),
            predictedEnd: new Date(command.predictedEnd),
        });
        return new ProjectResponse(project);
    }
}
