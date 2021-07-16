import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          ammount: 6000,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          ammount: 2000,
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      schema.create('transaction', data);
      return data;
    });

    this.put('/transactions/:id', (schema, request) => {
      const id = request.params.id;
      const data = JSON.parse(request.requestBody);
      const transaction = schema.db.transactions.find(id);
      transaction.update({ ...data });
      return this.schema.all('transaction');
    });

    this.delete('/transactions/:id', (schema, request) => {
      const id = request.params.id;
      schema.db.transactions.remove(id);
      return this.schema.all('transaction');
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
