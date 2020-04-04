let modules = [
    require('./Actor'),
    require('./Misc'),
    require('./Customer'),
    require('./Film'),
    require('./Payment'),
    require('./Rental'),
    require('./Staff'),
    require('./Store')
];

let typeDefs = ["type Query"];
let resolvers = [];
modules.forEach(m => {
    typeDefs.push(m.typeDefs);
    if (m.resolvers)
        resolvers.push(m.resolvers);
});

const { ApolloServer } = require('apollo-server-express');
const as = new ApolloServer({ typeDefs, resolvers });
module.exports = as.getMiddleware();