const { gql } = require('apollo-server-express');
const {
    StoreCollection,
    AddressCollection,
    StaffCollection
} = require('../MongoDB').collections;

const typeDefs = gql`
    extend type Query {
        stores: [Store]
        store(id: Int): Store
    }
    type Store {
        id: Int!
        name: String!
        address: Address
        manager: Staff
        staff: [Staff!]!
    }
`
const resolvers = {
    Query: {
        stores: () => StoreCollection.find().toArray(),
        store: (_, args) => StoreCollection.findOne({ _id: args.id })
    },
    Store: {
        id: (store) => store._id,
        address: (store) => AddressCollection.findOne({ _id: store.address_id }),
        manager: (store) => StaffCollection.findOne({ _id: store.manager_staff_id }),
        staff: (store) => StaffCollection.find({ store_id: store._id }).toArray()
    }
};

module.exports = { typeDefs, resolvers };