const { CountryCollection, CityCollection } = require('../MongoDB').collections;

const typeDefs = `
    extend type Query {
        searchForCountry(name: String!): [Country!]!
        searchForCity(name: String!): [City!]!
    }
    type Country {
        name: String!
        cities: [City!]!
    }
    type City {
        name: String!
        country: Country!
    }
    type Address {
        name: String!
        district: String
        city: String!
        postal_code: String
        phone: String
        location: String!
    }
`
const resolvers = {
    Query: {
        searchForCountry: (_, args) => CountryCollection.find({ name: new RegExp(`\\b${args.name}`, 'i') }).toArray(),
        searchForCity: (_, args) => CityCollection.find({ name: new RegExp(`\\b${args.name}`, 'i') }).toArray()
    },
    Country: {
        cities: (country) => CityCollection.find({ country_id: country._id }).toArray()
    },
    City: {
        country: (city) => CountryCollection.findOne({ _id: city.country_id })
    },
    Address: {
        name: (address) => address.address,
        city: (address) => CityCollection.findOne({ _id: address.city_id }).then(city => city.name)
    }
};

module.exports = { typeDefs, resolvers };