import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Project, resolvers as projectResolvers } from './project';

const SharedType = `
    type Query
    type Mutation
    input Pagination {
        pageSize: Int
        pageNumber: Int
    }
    interface Overview {
        total: Int!
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [SharedType, Project],
    resolvers: [{ ...projectResolvers }],
});

export { schema };
