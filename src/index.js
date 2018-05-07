import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//global default configuration
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//sets a global error catch in the headers
  let myInterceptor = axios.interceptors.request.use(request => {
    console.log(request);
    return request;
  }, error => {
    console.log(error);
    return Promise.reject(error);
  });

  axios.interceptors.request.eject(myInterceptor);

  axios.interceptors.response.use(response => {
    console.log(response);
    //edit request config
    return response;
  }, error => {
    return Promise.reject(error);
  });

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
