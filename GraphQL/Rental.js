const {
    RentalCollection,
    FilmCollection,
    CustomerCollection,
    StoreCollection,
    StaffCollection,
    PaymentCollection
} = require('../MongoDB').collections;
const moment = require('moment');

let typeDefs = `
    extend type Query {
        rental(id: Int!): Rental
    }
    type Rental {
        id: Int!
        film: Film!
        customer: Customer!
        store: Store!
        staff: Staff!
        rental_date: String!
        return_date: String!
        payments: [Payment!]!
    }
`
let resolvers = {
    Query: {
        rental: (_, args) => RentalCollection.findOne({ _id: args.id })
    },
    Rental: {
        id: (rental) => rental._id,
        film: (rental) => FilmCollection.findOne({ _id: rental.film_id }),
        customer: (rental) => CustomerCollection.findOne({ _id: rental.customer_id }),
        store: (rental) => StoreCollection.findOne({ _id: rental.store_id }),
        staff: (rental) => StaffCollection.findOne({ _id: rental.staff_id }),
        rental_date: (rental) => moment(rental.rental_date).format('Do MMMM YYYY HH:mm Z'),
        return_date: (rental) => moment(rental.return_date).format('Do MMMM YYYY HH:mm Z'),
        payments: (rental) => PaymentCollection.find({ rental_id: rental._id }).toArray()
    }
};

module.exports = { typeDefs, resolvers };