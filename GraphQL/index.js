const { ApolloServer, gql } = require('apollo-server-express');

try {
    const modules = [
        require('./Actor'),
        require('./Misc'),
        require('./Customer'),
        require('./Film'),
        require('./Payment'),
        require('./Rental'),
        require('./Staff'),
        require('./Store')
    ];

    const typeDefs = [
        gql`
            type Query
        `
    ];
    const resolvers = [];
    modules.forEach(m => {
        typeDefs.push(m.typeDefs);
        if (m.resolvers)
            resolvers.push(m.resolvers);
    });

    const as = new ApolloServer({ typeDefs, resolvers });
    module.exports = as.getMiddleware();

}
catch (err) {
    if (err.name == "GraphQLError")
        console.error("GraphQLError:", err.toString());
    else
        console.error(err);

    process.exit(1);
}