import { ProjectRepository } from 'contexts/projectManagement/domain/interface/ProjectRepository';
import { Command } from 'contexts/shared/domain/Command';
import { CommandHandler } from 'contexts/shared/domain/CommandHandler';
import { ProjectResponse } from '../query/ProjectResponse';
import { UpdateProjectCommand } from './UpdateProjectCommand';

export class UpdateProjectCommandHandler implements CommandHandler<UpdateProjectCommand> {
    constructor(private projectRepository: ProjectRepository) {}

    subscribedTo(): Command {
        return UpdateProjectCommand;
    }

    async handle(command: UpdateProjectCommand): Promise<ProjectResponse> {
        const project = await this.projectRepository.update({
            id: command.id,
            title: command.title,
            start: new Date(command.start),
            predictedEnd: command.predictedEnd ? new Date(command.predictedEnd) : null,
        });
        return new ProjectResponse(project);
    }
}
