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
    {id: 3, name: 'Brave New World', authorId: 3},
    {id: 4, name: 'Into the Wild', authorId: 4},
    {id: 5, name: 'The Picture of Dorian Grey', authorId: 5},
    {id: 6, name: '1984', authorId: 6},
    {id: 7, name: 'Animal Farm', authorId: 6}
];

const authors = [
    {id: 1, name: 'Dostoyevsky'},
    {id: 2, name: 'Kafka'},
    {id: 3, name: 'Huxley'},
    {id: 4, name: 'Krakeur'},
    {id: 5, name: 'Wilde'},
    {id: 6, name: 'Orwell'}
];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'An author of a book',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLNonNull(GraphQLString)},
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'A single book written by an author',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(
                    author => author.id === book.authorId
                )
            }
        }
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