# ReactJS Sample App

> 본 내용은 Velopert 님의 BLOG 포스팅 중 React.js Codelab 2016 부분을 개인적으로 보고자 정리한 글과 소스입니다.

- [Velopert 님 BLOG Codelab](https://velopert.com/1921)
- [Veloport 님 React.js Codelab Repository ](https://github.com/velopert/react-codelab-project)

## INDEX
- [Preparations](https://github.com/cliche90/reactjs_sample#preparations)
- [Install Packages](https://github.com/cliche90/reactjs_sample#install-packages)

## Preparations
1. Git
2. NodeJS / NPM
3. MongoDB

## Install Packages

> 초기 상태에서 강의를 보며 진행하기 위해 [velopert 님의 repository](https://github.com/velopert/react-codelab-project.git) 를 fork 한 후에 사용하려고 했으나, 편의상 새로운 Repository 를 생성하였습니다.


    npm install -g babel webpack webpack-dev-server
    npm install --save react react-dom
    npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 webpack webpack-dev-server
    npm install -g babel-cli nodemon cross-env
    npm install --save express body-parser
    npm install --save morgan mongoose express-session
    

- babel-cli: 콘솔환경에서 babel 을 사용할 수 있도록 해 줌
- nodemon: development 환경에서 파일이 수정될 대마다 서버를 재시작
- cross-env: 윈도우/리눅스/OSX 에서 환경변수값 설정
- morgan: HTTP 요청을 로그하는 미들웨어
- mongoose: mongodb 데이터 모델링 툴
- express-session: express 에서 세션 사용시 사용되는 미들웨어



