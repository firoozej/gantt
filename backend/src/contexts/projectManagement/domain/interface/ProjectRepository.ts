import { Nullable } from 'contexts/shared/domain/Nullable';
import { Project } from '../Project';

export interface ProjectRepository {
    find(id: string, withTasks: boolean): Promise<Nullable<Project>>;
    findAll(): Promise<Array<Project>>;
    save(project: Omit<Project, 'id' | 'tasks'>): Promise<Project>;
    update(project: Omit<Project, 'tasks'>): Promise<Project>;
    count(): Promise<number>;
}
