import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
    mutation createProject($title: String!, $start: String!, $predictedEnd: String) {
        createProject(title: $title, start: $start, predictedEnd: $predictedEnd) {
            id
        }
    }
`;

export { CREATE_PROJECT };
