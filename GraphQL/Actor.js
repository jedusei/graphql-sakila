const { gql } = require('apollo-server-express');
const { ActorCollection, FilmCollection } = require('../MongoDB').collections;

const typeDefs = gql`
    extend type Query {
        actor(id: Int!): Actor
    }
    type Actor {
        id: Int!
        name: String! 
        films: [Film!]!
    }
`
const resolvers = {
    Query: {
        actor: (_, args) => ActorCollection.findOne({ _id: args.id })
    },
    Actor: {
        id: (actor) => actor._id,
        films: (actor) => FilmCollection.find({ actor_ids: actor._id }).toArray()
    }
};

module.exports = { typeDefs, resolvers };