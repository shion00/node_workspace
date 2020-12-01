/*
Get Post 전송을 이해하기 위한 서버
Get : 가져오다(서버로부터 컨텐츠를 가져올때 사용하는 요청 방식)
        html<a> 링크가 바로 get 방식의 요청이다!
        GET방식으로 데이터 즉 파라미터를 전송하게 되면, 데이터가 노출되버린다.
        왜? HTTP 프로토콜의 헤더에 실어 나르므로.(편지봉투에 데이터를 작성하는 것과 같다)
        또한 편지봉투에 데이터를 전송하면 편지지에 비해 전송할 수 있는 데이터량에 한계가 있다.
        주용도) 다른 URL 로 링크를 통해 파라미터 전송할때

POST : 보내다는 의미(클라이언트가 서버에 데이터를 전송할때 사용하는 방식)
          HTTP 프로토콜의 body를 통해 데이터를 전송하기 때문에 편지지에 데이터를 실어서 보내
          는것과 같아, 봉투 안에 담아서 보내기 때문에 데이터 노출되지 않는다.
          특징) 보낼 수 있는 데이터량에 한계가 없다.
          용도) 노출되면 위험한 데이터 전송시 사용(로그인 요청,회원가입 등..)
                  파일(사진, 동영상 등 ) 등을 서버에 전송시 사용

          post 방식은 form태그를 이용해서 요청할 수 있다.
*/ 

var http=require("http");
var url=require("url");
var querystrint=require("querystring");//get, post 까지도 파싱이 가능

var server=http.createServer(function(request,response){
     //console.log("클라이언트의 요청 방식은",request.method);
     if(request.method=="GET"){
          response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
          response.end("클라이언트가 GET 방식으로 요청했네요");

          //get 방식으로 전달된 파라미터 받기!!
          var urlJson=url.parse(request.url,true);//true 매개변수를 넘기면, 파라미터 정보를 json으로 변환해준다!!
          //console.log("URL분석 결과는",urlJson);

          var paramJson=urlJson.query;//id, pass 담겨있다.
          console.log("ID : ",paramJson.id);
          console.log("pass : ",paramJson.pass);

     }else if(request.method=="POST"){
          response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
          response.end("클라이언트가 POST 방식으로 요청했네요");

          //body로 전송된 데이터는 url 분석만으로는 해결이 안된다.
          //post방식으로 전달된 데이터를 받기 위한 이벤트를 감지해보자!!
          request.on("data",function(param){
               // var str="korea";
               // var str2=new String("korea");
               //var postParam=url.parse(new String(param).toString(),true);
               var postParam=querystrint.parse(new String(param).toString());

               //console.log("POST 전송된 파라미터는 ",new String(postParam));
               console.log("ID : ",postParam.id);
               console.log("pass : ",postParam.pass);
     
          });


     }
});

server.listen(9999,function(){
     console.log("My Server is running at 9999 port..");
});