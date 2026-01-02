import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';

import express from 'express';
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`type Query { hello: String } `);
 
// The root provides a resolver function for each API endpoint
const root = {
  hello() {
    return 'Hello world!';
  },
};
 
const app = express();
 
// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);