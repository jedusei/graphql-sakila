const { gql } = require('apollo-server-express');
const moment = require('moment');

const typeDefs = gql`
    type Payment {
        payment_date: String!
        amount: Float!
    }
`
const resolvers = {
    Payment: {
        payment_date: (payment) => moment(payment.payment_date).format('Do MMMM YYYY')
    }
};

module.exports = { typeDefs, resolvers };