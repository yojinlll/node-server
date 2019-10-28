import * as http from 'http'
import * as fs from 'fs';
import * as p from 'path';

const server = http.createServer();
const publicDir = p.resolve(__dirname,'public')

server.on('request', (request:http.IncomingMessage,response:http.ServerResponse)=>{
  const {method,url,headers} = request
  switch(url){
    case '/index.html':
      fs.readFile(p.resolve(publicDir, 'index.html'), (error,data)=>{
        if(error) throw error;
        response.end(data.toString())
      })
      break
  }

})

server.listen(8888)
