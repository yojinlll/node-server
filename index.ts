import * as http from 'http'

const server = http.createServer();

server.on('request', (request:http.IncomingMessage,response:http.ServerResponse)=>{
  console.log('request.method', request.method);
  console.log('request.url', request.url);
  console.log('request.header', request.headers);
  const array = []  
  request.on('data',(chunk)=>{
    array.push(chunk)
    console.log('--', array);
    
  })
  request.on('end', ()=>{
    const body = Buffer.concat(array).toString()
    console.log('body', body);
    
  })
})

server.listen(8888)
