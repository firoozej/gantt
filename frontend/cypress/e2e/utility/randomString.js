const randomString = () => {
    const uniqueSeed = Date.now().toString();
    return Cypress._.uniqueId(uniqueSeed);
};
export { randomString };
