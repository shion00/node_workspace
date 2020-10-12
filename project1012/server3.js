/*
Node.js 에서 오라클과 연동해보자!!
*/ 
let conStr={
     user:"user0907",
     password:"1234",
     connectionString:"localhost/XE" //XE 는 오라클 설치시 이름
};//오라클에 접속할때 필요한 정보!!

//오라클을 접속하려면, 접속을 담당하는 모듈을 사용해야 한다.
//우리가 node.js를 설치하면 아주 기본적인 모듈만 내장되어 있기 때문에,
//개발에 필요한 모듈은 그때 그때 다운로드 받아 설치해야 한다.(이래서 node.js 가 인기 있는 것임)
var oracledb=require("oracledb");
//cmd 창 노드.js 에서 npm install oracledb 입력하면 자동으로 인스톨 된다.

//오라클에 접속을 시도해 본다!!
oracledb.getConnection(conStr,function(error,con){
     if(error){//실패하면..
          console.log("접속실패ㅜㅜ",error);
     }else{
          console.log("접속 성공");

          //테이블에 데이터를 넣어보자!!
          //접속객체를 이용하여 insert 쿼리를 날려보자!!
          insert(con);
     }
});

function insert(con){
     var sql="insert  into  member2(member2_id, firstname,lastname,local,msg)";
     sql+=" values( seq_member2.nextval, '트맨','배','동굴','안녕')";

     //쿼리실행
     con.execute(sql,function(error,result,fields){
          if(error){
               console.log("입력실패ㅜㅜ",error);
          }else{
               console.log("입력성공");
          }
     });

     console.log("insert 할꺼임");

}