import { ProjectRepository } from 'contexts/projectManagement/domain/interface/ProjectRepository';
import { Project } from 'contexts/projectManagement/domain/Project';
import { Nullable } from 'contexts/shared/domain/Nullable';
import { Project as ProjectModel } from './models/Project';

export class MongoProjectRepository implements ProjectRepository {
    find(id: string, withTasks: boolean): Promise<Nullable<Project>> {
        const project = new Project(
            '1',
            'test project',
            new Date('2022-06-02 09:10'),
            new Date('2022-08-02 09:10'),
            [],
        );
        return new Promise((resolve) => resolve(project));
    }
    async findAll(): Promise<Array<Project>> {
        return await ProjectModel.find();
    }
    async save(project: Omit<Project, 'id' | 'tasks'>): Promise<Project> {
        const newProject = new ProjectModel(project);

        const result = await newProject.save();
        return { ...result._doc, id: result._id.toString() };
    }
    async update(project: Omit<Project, 'tasks'>): Promise<Project> {
        const result = await ProjectModel.findByIdAndUpdate(project.id, project, {new: true});
        return { ...result._doc, id: result._id.toString() };
    }
}
