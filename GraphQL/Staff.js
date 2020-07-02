const { gql } = require('apollo-server-express');
const {
    StaffCollection,
    StoreCollection
} = require('../MongoDB').collections;

const typeDefs = gql`
    extend type Query {
        staff(id: Int!): Staff
    }
    type Staff {
        id: Int!
        name: String!
        store: Store!
    }
`
const resolvers = {
    Query: {
        staff: (_, args) => StaffCollection.findOne({ _id: args.id })
    },
    Staff: {
        id: (staff) => staff._id,
        store: (staff) => StoreCollection.findOne({ _id: staff.store_id })
    }
};

module.exports = { typeDefs, resolvers };