/**
 * Home.js : main page
 * 
 */
// React 패키지 불러오기 
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";

// redux hook 사용하기 위해 불러오기 
import { useSelector } from "react-redux";

//component & elements 불러오기
import WordCard from "./WordCard";
import { RoundBtn } from "./Btn";

// redux
//import { loadMoreWordsFB } from "./redux/module/words";


const Home = () => {
    const words = useSelector((state) => state.words.word_list);
    const lastValue = useSelector((state) => state.words.lastValue);

    const [target, setTarget] = useState(null);
    //console.log(words);
    
    return (
        <div>
            <Cards>
                {words.map((word, idx) => {
                    // 새로 불러온 데이터 중 가장 마지막 값을 찾아 target으로 설정함
                    const lastItem = idx === words.length -1;   
                    console.log("words length :  ", words.length -1);
                    return (
                        <WordCard 
                            key={word.id}
                            word_obj={word}
                            ref={lastItem ? setTarget : null}
                        />
                    );
                })}
            </Cards>
            <AddBtn to="/word/add">
                <Plus />
            </AddBtn>
        </div>
    );

};


const Cards = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: flex-start;
   gap: 20px;
   width: 100%;
   padding: 50px 0;
 `;
 
 const Plus = styled(TiPlus)`
   font-size: 28px;
 `;
 
 const AddBtn = styled(Link)`
   ${RoundBtn};
   position: fixed;
   bottom: 10px;
   right: 10px;
   box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
     rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
   ${({ theme }) => theme.device.tablet} {
     bottom: 20px;
     right: 20px;
   }
   ${Plus} {
     transition: transform 300ms ease-in-out;
   }
   &:hover {
     ${Plus} {
       transform: rotate(90deg);
     }
   }
 `;

 export default Home;