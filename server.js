const express = require('express');
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const books = [
    {id: 1, name: 'Notes from Underground', authorId: 1},
    {id: 2, name: 'The Trial', authorId: 2},
    {id: 3, name: 'The Brothers Karamazov', authorId: 1}
];

const authors = [
    {id: 1, name: 'Dostoyevsky'},
    {id: 2, name: 'Kafka'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'A single book written by an author',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)}
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: GraphQLList(BookType),
            description: 'List of Books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
});

const app = express();
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true,
}));
app.listen(5000., () => console.log('is running'));