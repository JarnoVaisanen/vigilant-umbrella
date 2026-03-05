const http = require('http'); 

const hostname = '127.0.0.1'; 
const port = 3000; 

const server = http.createServer((req, res) => { 
  res.statusCode = 200; 
  res.setHeader('Content-Type', 'text/plain'); 
  res.end('Hello World'); 
}); 

server.listen(port, hostname, () => { 
  console.log(`Server running at http://vigilant-umbrella-theta.vercel.app/}:${port}/`); });
  mongodb+srv://jarnovaisanen_db_user:<z}mATw&g7c'>pj^>@clustertodoapp.muecmog.mongodb.net/?appName=ClusterToDoApp
Read more here: https://locall.host/3000/

import ToDoList from './ToDoList.jsx';

function App() {

  return (<ToDoList />)
}
