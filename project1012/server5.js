/*웹서버를 구축하여, 클라이언트가 전송한 파라미터 값들을 
mysql에 넣어보자!*/

var http=require("http");//http 모듈 가져오기
var fs=require("fs");//File system 모듈 가져오기

//http 모듈로 부터 server 객체 생성하기
var server=http.createServer(function(request,response){

     //아래의 코드들이 동작하기 전에, 서버는 클라이언트가 원하는게 무엇인지 구분을 먼저 해야한다.
     //요청 분석!!!이라 한다
     //요청 분석을 들어가려면, 요청 정보를 담고 있는 request 객체를 이용해야 한다!!
     console.log("클라이언트가 요청시 사용한 url",request.url);

     //1)클라이언트가 회원가입 양식을 보기를 원하면 아래의 코드가 수행
     //서버에 존재하는 회원가입양식 폼파일을 읽어서, 클라이언트의 브라우저에 보내주자!!
     fs.readFile("./회원폼유효성체크.html","utf-8",function(error,data){
          if(error){
               console.log("파일을 읽지 못했습니다.",error);
          }else{
               //http 프로토콜 상, 약속을 지켜서, 즉 형식을 지켜서 보내자
               response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
               response.end(data);//클라이언트에게 컨텐츠 전송
          }
     });

     //2) 가입을 원할 경우엔, db에 넣어줘야 하고,

     //3) 이미지를 원하는 이미지 보여줘야하고,

     //4)  오디오파일을 원하면 오디오를 전송해주고..

});

//서버 가동하기
server.listen(7979,function(){
     console.log("Server is running at 7979 port..");
});