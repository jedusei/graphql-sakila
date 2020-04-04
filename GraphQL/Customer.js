const {
    CustomerCollection,
    AddressCollection,
    RentalCollection,
    StoreCollection
} = require('../MongoDB').collections;

const typeDefs = `
    extend type Query {
        customer(id: Int!): Customer
    }
    type Customer {
        id: Int!
        name: String!
        email: String!
        address: Address
        store: Store
        rentals: [Rental!]!
    }
`
const resolvers = {
    Query: {
        customer: (_, args) => CustomerCollection.findOne({ _id: args.id })
    },
    Customer: {
        id: (customer) => customer._id,
        address: (customer) => AddressCollection.findOne({ _id: customer.address_id }),
        store: (customer) => StoreCollection.findOne({ _id: customer.store_id }),
        rentals: (customer) => RentalCollection.find({ customer_id: customer._id }).toArray()
    }
};

module.exports = { typeDefs, resolvers };