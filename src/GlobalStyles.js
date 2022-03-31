/**
 * GlobalStyles.js
 * 글로벌하게 적용되는 스타일만 모아서 작성
 */

 import { createGlobalStyle } from "styled-components";
 import { reset } from "styled-reset";
 //import Background from "./img/dot-grid.png"; // 이미지는 public 폴더에 놓고 관리하면 좋음 - 참고 : https://writingdeveloper.blog/301
 
 const GlobalStyles = createGlobalStyle`
    // reset.css 를 리액트에서 쉽게 사용하는 방법
    ${reset}
    // font 가져오기
    @font-face {
      font-family: 'ChosunGu';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff') format('woff');
      font-weight: normal;
      font-style: normal;
     }
 
    * {
      box-sizing: border-box;
    }
    
    body {
      min-height: 100vh - 60px;
      background-image: url();
      font-family: 'ChosunGu', 'Noto Sans SC', sans-serif;
    }
    
    a {
      text-decoration: none;
      color: black;
    }
    
    button {
      cursor: pointer;
    }
    
    input,
    textarea,
    button {
      border: none;
      background-color: transparent;
      font-family: 'ChosunGu', 'Noto Sans SC', sans-serif;
      outline: none;
    }
  `;
 
 export default GlobalStyles;