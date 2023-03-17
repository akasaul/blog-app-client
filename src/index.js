import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';
import { Provider } from 'react-redux'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
      </ApolloProvider>
      </Provider>
      <ToastContainer />
  </React.StrictMode>
);
