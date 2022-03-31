/**
 * Btn.js : 버튼 스타일을 RountBtn과 RectangleBtn으로 나누어 지정한 뒤 사용할 컴포넌트에서 import하여 사용
 */

 import { css } from "styled-components";

 // RoundBtn과 RectangleBtn에서 공통적으로 사용할 스타일
 const Btn = css`
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${({ theme }) => theme.colors.white};
   background-color: ${({ theme }) => theme.colors.mainColor};
 `;
 
 export const RoundBtn = css`
   ${Btn};
   width: 50px;
   height: 50px;
   border-radius: 50%;
 `;
 
 export const RectangleBtn = css`
   ${Btn};
   width: 200px;
   height: 40px;
   font-size: ${({ theme }) => theme.fontSizes.md};
 `;