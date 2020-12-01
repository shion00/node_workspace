var http=require("http");
var express=require("express");
var mysql=require("mysql");
var fs=require("fs");
var ejs=require("ejs");

let conStr={
     url:"localhost",
     user:"root",
     password:"",
     database:"node"
}
let con;


var app=express();

app.get("/",function(request,response){
     fs.readFile("./list연습.html","utf-8",function(error,data){
          if(error){
               console.log("list연습.html 읽기 실패",error);
          }else{
               response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
               response.end(data)
          }
     });
     
});

app.get("/registForm",function(request,response){
     fs.readFile("./registForm연습.html","utf-8",function(error,data){
          if(error){
               console.log("registForm연습.html 읽기 실패",error);
          }else{
               response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
               response.end(data)
          }
     });
     
});










function connect(){
     con=mysql.createConnection(conStr);
}

var server=http.createServer(app);
server.listen(9999,function(){
     console.log("My Server is running 9999 port...");
     connect();
});