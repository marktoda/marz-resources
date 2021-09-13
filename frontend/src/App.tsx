import React from 'react';

import { ApolloProvider } from '@apollo/client';
import './App.css';
import { client } from './queries/client';
import Home from "./pages/Home";
import {Web3Provider} from "./contexts/Web3Context";
import {Header} from "./components/Header/Header";
import theme from "./theme";
import {ThemeProvider} from "@material-ui/core";
import {Footer} from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ApolloProvider client={client}>
          <Web3Provider>
            <Header />
            <Home />
            <Footer />
          </Web3Provider>
        </ApolloProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
