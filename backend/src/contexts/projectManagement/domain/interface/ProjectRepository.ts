import { Nullable } from 'contexts/shared/domain/Nullable';
import { Project } from '../Project';

export interface ProjectRepository {
    find(id: string): Promise<Nullable<Project>>;
    findAll(): Promise<Array<Project>>;
    save(project: Project): Promise<void>;
}
