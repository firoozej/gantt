import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
    mutation createProject($title: String!, $start: String!, $predictedEnd: String) {
        createProject(title: $title, start: $start, predictedEnd: $predictedEnd) {
            id
            title
            start
            predictedEnd
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation updateProject($id: String!, $title: String!, $start: String!, $predictedEnd: String) {
        updateProject(id: $id, title: $title, start: $start, predictedEnd: $predictedEnd) {
            id
            title
            start
            predictedEnd
        }
    }
`;

const PROJECTS_QUERY = gql`
    query {
        projects {
            id
            title
            start
            predictedEnd
        }
    }
`;

export { CREATE_PROJECT, UPDATE_PROJECT, PROJECTS_QUERY };
