/*서버구축 연습1*/

var http=require("http");
var fs=require("fs");
var url=require("url");
var mysql=require("mysql");

let conStr={
     url:"localhost",
     user:"root",
     password:"",
     database:"node"
};

var con;

var server=http.createServer(function(request,response){
     //console.log("요청의 url은 ",request.url);
     var urlJson=url.parse(request.url);
     //console.log("urlJson은 ",url.parse(request.url));
     
     if(urlJson.pathname=="/"){
          fs.readFile("./index연습.html","utf-8",function(error,data){
               if(error){
                    console.log("읽기 실패",error);
               }else{
                    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                    response.end(data);
               }
          });
     }else if(urlJson.pathname=="/member/registForm"){
          console.log("urlJson.query는  ",urlJson.query)
          fs.readFile("./registForm연습.html","utf-8",function(error,data){
               if(error){
                    console.log("읽기 실패",error);
               }else{
                    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                    response.end(data);
               }
          });
     }else if(urlJson.pathname=="/member/loginForm"){
          fs.readFile("./loginForm연습.html","utf-8",function(error,data){
               if(error){
                    console.log("읽기 실패",error);
               }else{
                    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                    response.end(data);
               }
          });
     }else if(urlJson.pathname=="/member/regist"){
               var sql="insert into member2(uid,password,uname,phone,email,receive,addr,memo)";
               sql+=" values(?,?,?,?,?,?,?,?)";



     }

     
});

function getConnection(){
     con=mysql.createConnection(conStr);
}


server.listen(9898,function(){
     console.log("My Server is running 9898 port..");
     getConnection();
});