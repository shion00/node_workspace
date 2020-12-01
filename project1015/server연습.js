let http=require("http");
let url=require("url");
let fs=require("fs");
let mysql=require("mysql");
let ejs=require("ejs");

let con;
var urlJson;


var server=http.createServer(function(request,response){
     urlJson=url.parse(request.url,true); 
     if(urlJson.pathname=="/"){
          fs.readFile("./index.html","utf-8",function(error,data){
               if(error){
                    console.log("index.html 읽기 실패",error);
               }else{
                    response.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
                    response.end(data);
               }
          });
     }else if(urlJson.pathname=="/member/registForm"){
          registForm(request,response);
     }else if(urlJson.pathname=="/member/loginForm"){
          loginForm(request,response);
     }else if(urlJson.pathname=="/member/list"){
          list(request,response);
     }                                                                  
});


function registForm(request,response){
     var sql="select * from skill";
     con.query(sql,function(error,record,fields){
          if(error){
               console.log("",error);
          }else{
               fs.readFile("./registForm.ejs","utf-8",function(error,data){
                    if(error){
                         console.log("registForm.ejs 읽기 실패",error);
                    }else{
                         response.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
                         response.end(ejs.render(data,{
                              skillArray:record
                         }));
                    }
               });
          }
     });


}

function loginForm(request,response){

     fs.readFile("./loginForm.html","utf-8",function(error,data){
          if(error){
               console.log("loginForm.html 읽기 실패",error);
          }else{
               response.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
               response.end(data);
          }
     });
}

function list(request,response){
     fs.readFile("./list.ejs","utf-8",function(error,data){
          if(error){
               console.log("list.ejs 읽기 실패",error);
          }else{
               response.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
               response.end(data);
          }
     });
}


function connect(){
     con=mysql.createConnection({
          url:"localhost",
          user:"root",
          password:"",
          database:"node"
     });
}

server.listen(8989,function(){
     console.log("My Server is running 8989 port..");
     connect();
});