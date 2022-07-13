import { ApolloError } from 'apollo-server-express';
import container from 'apps/dependency-injection';
import { ProjectRequest } from 'contexts/projectManagement/application/project/query/ProjectReuest';

export const typeDef = `
    type Project {
        id: String
        title: String!
        start: String
        predictedEnd: String
    }

    type Task {
        id: String
        title: String
    }

    type ProjectOverview implements Overview {
        total: Int!
        data: [Project]
    }

    extend type Query {
        project(id: String!, withTasks: Boolean): Project
        projects(pagination: Pagination!): ProjectOverview
    } 
    extend type Mutation {
        createProject(title: String!, start: String!, predictedEnd: String): Project
        updateProject(id: String!, title: String!, start: String!, predictedEnd: String): Project
    }
       
`;

export const resolvers = {
    Query: {
        project: async (id: string, withTasks: boolean) => {
            const projectController = container.get('Apps.projectManagement.controllers.ProjectController');
            try {
                return await projectController.project(new ProjectRequest(id, withTasks));
            } catch (e: any) {
                return new ApolloError(e.message);
            }
        },
        projects: async (_: any, args: any) => {
            const projectController = container.get('Apps.projectManagement.controllers.ProjectController');
            try {
                return await projectController.projects(args.pagination);
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
