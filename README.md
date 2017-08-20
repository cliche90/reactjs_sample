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

## Backend : 계정인증 구현

    npm install --save bcryptjs

- model/account.js 에서 Account.methods 를 만들 때, Arrow function 을 사용하면 this binding 오류 발생

## Backend : 메모 작성 / 수정 / 삭제 / 읽기 구현

## Webpack 추가 설정

> webpack.config.js & webpack.dev.config.js


    var path = requre('path');

        resolve: {
            root: path.resolve('./src')
        }


> 모듈 추가 설치


    npm install --save axios react-addons-update react-router react-timeago redux react-redux redux-thunk


- axios: HTTP 클라이언트
- react-addon-update: Immutability Helper (Redux의 store 값 변경에 사용)
- react-router: 클라이언트 사이드 라우터
- react-timeago: 시간 계산을 통해 3 minute ago 와 같이 계산해주는 React 컴포넌트
- redux, react-redux: FLUX 구현체, 뷰 레이어 바인딩
- redux-thunk: redux의 action creator 에서 함수를 반환할 수 있게 해주는 redux 미들웨어, 비동기 작업 처리에 사용