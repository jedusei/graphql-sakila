let modules = [];

let typeDefs = ["type Query { x:Int }"];
let resolvers = [];
modules.forEach(m => {
    typeDefs.push(m.typeDefs);
    if (m.resolvers)
        resolvers.push(m.resolvers);
});

const { ApolloServer } = require('apollo-server-express');
const as = new ApolloServer({ typeDefs, resolvers });
module.exports = as.getMiddleware();