const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
dotenv.config();

const { connectDB } = require('./db');
const { schema } = require('./models/User');
const app = express();

connectDB();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome! Go to /graphql' });
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));