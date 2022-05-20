import { ApolloError } from 'apollo-server-express';
import container from 'apps/dependency-injection';

const ProjectResolvers = {
    Query: {
        project: async (id: string) => {
            const projectController = container.get('Apps.projectManagement.controllers.ProjectController');
            try {
                return await projectController.project({ id });
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
};

export default ProjectResolvers;
