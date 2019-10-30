import * as http from 'http'
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicDir = p.resolve(__dirname,'public')
const cacheTime = 31536000

server.on('request', (request:http.IncomingMessage,response:http.ServerResponse)=>{
  const {method,url:path,headers} = request
  const {pathname,search} = url.parse(path)
  if(method !== 'GET'){
    response.statusCode =405
    response.end()
    return
  }

  let filename = pathname.substr(1)
  filename === '' ? filename = 'index.html' : filename
  
  fs.readFile(p.resolve(publicDir, filename), (error,data)=>{
    if(error){
      if(error.errno === -4058){
        response.statusCode = 404
        fs.readFile(p.resolve(publicDir, '404.html'), (error,data)=>{
          response.end(data)
        })
      }else{
        response.statusCode = 500
        response.end('服务器繁忙，请稍后再试')
      }
    }else{
      response.setHeader('Cache-Control', `public,max-age=${cacheTime}`)
      response.end(data)
    }
  })

  

})

server.listen(8888)
