const { gql } = require('apollo-server-express');
const {
    ActorCollection,
    CategoryCollection,
    FilmCollection,
    LanguageCollection,
    RentalCollection
} = require('../MongoDB').collections;

const typeDefs = gql`
    extend type Query {
        film(id: Int!): Film
    }
    type Film {
        id: Int!
        title: String!
        description: String!
        language: String!
        release_year: Int!
        length: Int!
        categories: [String!]!
        rating: String!
        actors: [Actor!]!
        special_features: [String!]!
        rental_duration: Int!
        rental_rate: Float!
        rentals: [Rental!]!
    }
`
const resolvers = {
    Query: {
        film: (_, args) => FilmCollection.findOne({ _id: args.id })
    },
    Film: {
        id: (film) => film._id,
        language: (film) => LanguageCollection.findOne({ _id: film.language_id }).then(lang => lang.name),
        release_year: (film) => film.release_year.getUTCFullYear(),
        categories: (film) => CategoryCollection.find({ _id: { $in: film.category_ids } }).map((c) => c.name).toArray(),
        actors: (film) => ActorCollection.find({ _id: { $in: film.actor_ids } }).toArray(),
        rentals: (film) => RentalCollection.find({ film_id: film._id }).toArray()
    }
};

module.exports = { typeDefs, resolvers };