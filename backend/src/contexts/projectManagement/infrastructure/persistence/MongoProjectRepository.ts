import { ProjectRepository } from 'contexts/projectManagement/domain/interface/ProjectRepository';
import { Project } from 'contexts/projectManagement/domain/Project';
import { Nullable } from 'contexts/shared/domain/Nullable';

export class MongoProjectRepository implements ProjectRepository {
    find(id: string, withTasks: boolean): Promise<Nullable<Project>> {
        const project = new Project(
            '1',
            'test project',
            '1633638600000',
            '1633638600000 + 3 * 24 * 60 * 60 * 1000',
            [],
        );
        return new Promise((resolve) => resolve(project));
    }
    findAll(): Promise<Array<Project>> {
        const project = new Project(
            '1',
            'test project',
            '1633638600000',
            '1633638600000 + 3 * 24 * 60 * 60 * 1000',
            [],
        );
        return new Promise((resolve) => resolve([project]));
    }
    save(project: Project): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
