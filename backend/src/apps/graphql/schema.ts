import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Project {
        id: String
        title: String!
        start: String
        predictedEnd: String
        tasks: [Task!]
    }
    type Task {
        id: String
        title: String
    }
    type Query {
        project(id: String!, withTasks: Boolean): Project
        projects: [Project]
    }
    type Mutation {
        createProject(title: String!, start: String!, predictedEnd: String): Project
    }
`;
