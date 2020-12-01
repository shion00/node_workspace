/*기존의 http모듈만으로 구축했던 서버에는 기능상 부족한 점이 많다.
문제점1) 이미지와 같은 정적파일에 대한 요청 처리가 미비
해결책) http 모듈은 아주 기본적인 서버구축 모듈이므로,
          이보다 기능을 보강한 모듈로 확장해보자!!

          http -> connect(http보완) -> express모듈(connect보완)
*/ 

var http=require("http");
var fs=require("fs");
var express=require("express"); //http보다 훨씬 더 많은 기능이 보강된 모듈
var static=require("serve-static");//정적 자원 처리 전담 미들웨어!!
var mysql=require("mysql");
var ejs=require("ejs");
var common=require("./common.js");

let conStr={
     url:"localhost",
     user:"root",
     password:"",
     database:"node"
};
let con;

//express 모듈은 미들웨어라 불리는 함수를 이용하여 기존의 http모듈로는 
//할 수 없었던 추가된 기능들을 지원한다.(express 필수라고 보아야 한다.)
//참고로 미들웨어는 express 객체의 use() 메서드로 지정 할 수 있다.
//사용예) app.use(사용할 미들웨어);
//오늘 사용할 미들웨어는 static 미들웨어이다.
//static 은 '정적인' 의 의미로서, 전산분야에서 정적이라는 뜻은, 프로그래밍언어
//처럼 실행시 변경이 가능한 것이 아니라, 고정되어 있는 형태를 의미
//html, images, css 파일은 프로그래밍 언어가 아니기에, 실행타임에 변경이 불가하다.
//그래서 자바스크립트와같은 프로그래밍 언어가 정적으로 제어하기 위해 등장

var app=express();//express 객체생성
// __dirname, __filename (현재 실행중인 node.js 파일의 경로를 반환해줌)
//console.log("현재 실행중인 파일의 디렉토리 경로 : ", __dirname);
app.use(static(__dirname+"/static"));//정적자원의 위치를 등록!!

//form양식으로 전송될때 처리
app.use(express.urlencoded({
     extended:true
}));

//요청, 응답은 use() 메서드로 처리해야 한다.
//post(매개변수1, 매개변수2) 메서드의 매개변수가 2개이다.
//매개변수1 : 요청uri
app.post("/notice/regist",function(request, response){
     //response.end("your http method is post");
     //console.log("당신이 보낸 body는 ",request.body);
     //파라미터 3개 받기!!

     var title=request.body.title;
     var writer=request.body.writer;
     var content=request.body.content;

     console.log("당신이 보낸 제목은 ",title);
     console.log("당신이 보낸 작성자는 ",writer);
     console.log("당신이 보낸 내용은 ",content);

     var sql="insert into notice(title,writer,content)";
     sql+=" values(?,?,?)";

     con.query(sql,[title,writer,content],function(error,fields){
          if(error){
               console.log("insert 실패",error);
          }else{
               response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
               response.end(common.getMsgURL("등록성공","/notice/list"));
               
          }
     });

});


//목록 가져오기
app.get("/notice/list",function(request,response){
     var sql="select * from notice order by notice_id desc";//내림차순

     con.query(sql,function(error,record,fields){
          if(error){
               console.log("list error", error);
          }else{
               fs.readFile("./list.ejs","utf8",function(err,data){
                    if(err){
                         console.log("readFile error", err);
                    }else{
                         //console.log("record 는",record)
                         response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                         response.end(ejs.render(data,{
                              noticeArray:record
                         }));
                    }
               });
          }
     });

});


//한건 가져오기
app.get("/notice/detail",function(request,response){
     //get 방식의 파라미터 받기!
     var notice_id=request.query.notice_id;
     var sql="select * from notice where notice_id=?";
     con.query(sql,[notice_id],function(error,record,fields){
          if(error){
               console.log("select error", err);
          }else{
               fs.readFile("./detail.ejs","utf-8",function(err,data){
                    if(err){
                         console.log("detail.ejs error", err);
                    }else{
                         response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                         response.end(ejs.render(data,{
                              notice:record[0] //한건
                         }));

                    }
               });
          }
     });
});


//한건 삭제
app.post("/notice/del",function(request,response){
     //파라미터 받기 (post 방식)
     var notice_id=request.body.notice_id;
     var sql="delete from notice where notice_id=?";//바인드 변수 사용
     con.query(sql,[notice_id],function(error,fields){
          if(error){
               console.log("delete fail : ", error);
          }else{
               //메시지 출력후, list 요청
               response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
               response.end(common.getMsgURL("삭제성공","/notice/list"));
          }
     });
});



//데이터베이스 접속
function connect(){
     con=mysql.createConnection(conStr);
}


var server=http.createServer(app);//express 모듈을 이용한 서버!!
server.listen(8888,function(){
     console.log("The Server using express is running at 8888 port..");
     connect();
});
