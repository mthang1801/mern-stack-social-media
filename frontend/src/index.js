import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import reportWebVitals from "./reportWebVitals";
import { client } from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "./i18n";
ReactDOM.render(  
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>    
      <App />    
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
