import { ApolloError } from 'apollo-server-express';
import container from 'apps/dependency-injection';
import { ProjectRequest } from 'contexts/projectManagement/application/project/query/ProjectReuest';

const ProjectResolvers = {
    Query: {
        project: async (id: string, withTasks: boolean) => {
            const projectController = container.get('Apps.projectManagement.controllers.ProjectController');
            try {
                return await projectController.project(new ProjectRequest(id, withTasks));
            } catch (e: any) {
                return new ApolloError(e.message);
            }
        },
        projects: async () => {
            const projectController = container.get('Apps.projectManagement.controllers.ProjectController');
            try {
                return await projectController.projects();
            } catch (e: any) {
                return new ApolloError(e.message);
            }
        },
    },
    Mutation: {
        createProject: async (_: any, args: any) => {
            const projectController = container.get('Apps.projectManagement.controllers.ProjectController');
            try {
                return await projectController.create(args);
            } catch (e: any) {
                return new ApolloError(e.message);
            }
        },
        updateProject: async (_: any, args: any) => {
            const projectController = container.get('Apps.projectManagement.controllers.ProjectController');
            try {
                return await projectController.update(args);
            } catch (e: any) {
                return new ApolloError(e.message);
            }
        },
    },
};

export default ProjectResolvers;
