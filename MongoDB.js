const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(
    process.env.MONGODB_URI || "mongodb+srv://sakila:iIVgLx1E3pq4qihi@cluster0-7mtcg.mongodb.net/sakila?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
);

/** @typedef {import('mongodb').Collection} Collection */
const collections = {
    /** @type {Collection} */
    ActorCollection: { collectionName: 'actor' },
    /** @type {Collection} */
    AddressCollection: { collectionName: 'address' },
    /** @type {Collection} */
    CategoryCollection: { collectionName: 'category' },
    /** @type {Collection} */
    CityCollection: { collectionName: 'city' },
    /** @type {Collection} */
    CountryCollection: { collectionName: 'country' },
    /** @type {Collection} */
    CustomerCollection: { collectionName: 'customer' },
    /** @type {Collection} */
    FilmCollection: { collectionName: 'film' },
    /** @type {Collection} */
    InventoryCollection: { collectionName: 'inventory' },
    /** @type {Collection} */
    LanguageCollection: { collectionName: 'language' },
    /** @type {Collection} */
    PaymentCollection: { collectionName: 'payment' },
    /** @type {Collection} */
    RentalCollection: { collectionName: 'rental' },
    /** @type {Collection} */
    StaffCollection: { collectionName: 'staff' },
    /** @type {Collection} */
    StoreCollection: { collectionName: 'store' },
};

client.on('connect', () => {
    const db = client.db();
    Object.values(collections).forEach(c => {
        Object.setPrototypeOf(c, db.collection(c.collectionName));
    });
});

module.exports = { client, collections };