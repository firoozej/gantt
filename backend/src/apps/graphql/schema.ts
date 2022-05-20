import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Project {
        id: String
        title: String!
        start: String
        end: String
        tasks: [Task!]
    }
    type Task {
        id: String
        title: String
    }
    type Query {
        project(id: String!): Project
        projects: [Project]
    }
`;
