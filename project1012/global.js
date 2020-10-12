/*
node.js 자체적으로 지원하는 전역변수를 알아본다.
1) _dirname : 현재 실행중인 js 파일의 풀 경로 반환
2) _filename : 파일명 반환

node.js 자체적으로 지원하는 전역객체를 알아본다
1) console
2) exports
3) module
4) process
5) global
*/ 

// 전역변수
//console.log("지금 실행중인 파일명은 ", _filename);
//console.log("지금 실행중인 디렉토리는 ", _dirname);


/*
//console 객체
//실행시 시작 시간을 출력해준다.
console.time("mycpu");//원하는 제목을 넣어줄 수 있다.
//~~~~로직 수행
for(var i=1;i<=1000000;i++){
}
console.log("100만번 수행 완료");
console.timeEnd("mycpu");//종료시간을 출력해준다.
 

//process 객체
//console.log(process.arch); //cpu에 대한 정보
//console.log(process.env); //컴퓨터 환경 정보
//console.log(process.platform);//프레폼 정보
*/