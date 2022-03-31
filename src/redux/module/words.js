/**
 *  words.js : ducks 패턴을 사용한 words 모듈 파일
 *  기능  : word 불러오기 , add , 완료/미완료 toggle, modify, delete
 */

import { firestore } from "../../firebase";
//import { doc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";


const words_db = firestore.collection("words");

// Action 
const LOAD = "words/LOAD";
const LOAD_MORE = "words/LOAD_MORE";
const ADD = "word/ADD";
const MODIFY = "word/MODIFY";
const COMPLETE = "word/COMPLETE";
const DELETE = "word/DELETE";

// 초기값
const inintialState = {
    word_list: [],
    lastValue: 0,
};


//Action Creator(액션 생성 함수)
export const loadWords = (words, lastValue) => ({
    type: LOAD,
    words,
    lastValue,
});

export const loadMoreWords = (words, lastValue) => ({
    type: LOAD_MORE,
    words,
    lastValue,
});

export const addWord = (word) => ({ type: ADD, word });
export const updateComplete = (id) => ({ type: COMPLETE, id });
export const modifyWord = (word) => ({ type: MODIFY, word });
export const deleteWord = (id) => ({ type: DELETE, id });

// middlewares(thunk)
// firebase에서 단어들을 처음 불러오는 함수 
export const loadWordsFB = (value) => {
    return function (dispatch) {
        let words = [];
        let lastValue;
        words_db
            .orderBy("date", "desc")         // date라느 key를 기준으로 내림차순 정렬
            .limit(10)
            .get()
            .then((docs) => 
            {
                docs.forEach((doc) => 
                {
                    words = [...words, { id: doc.id, ...doc.data() }];
                    lastValue = doc.data().data;    // 마지막으로 가져온 date값(다음 값을 가져오기 위해 저장)
                });
                
                if (words.length > 0){
                    alert("단어를 불러오는 중입니다");
                }
            })
            .then((res) => dispatch(loadWords(words, lastValue)));
            
    // async awit 사용 firebase v9에서 사용
    // return async function (dispatch) {
    //     const word_data = await getDocs(collection(firestore,"words"));
    //     let words = [];
    //     let lastValue;
        
    //     word_data.forEach((doc)=>{
    //         words.push({ id: doc.id, ...doc.data() });
    //         lastValue.push(doc.data().data)
    //     })
    //     dispatch(loadWords(words, lastValue));

        
    }
}

export const loadMoreWordsFB = (value) => {
    return function (dispatch) {
        let words = [];
        let beforeNum = parseInt(value);
        let lastValue;
        words_db
            .orderBy("date", "desc")
            .startAfter(beforeNum)      // 가장 마지막으로 가져온 값 다음부터 시작 
            .limit(10)
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    if (doc.exists) {
                        words = [...words, { id: doc.id, ...doc.data() }];
                        lastValue = doc.data().data;
                    }
                });
            })
            .then((res) => dispatch(loadMoreWords(words, lastValue)));
    };
};

// function add new word
export const addWordFB = (word) => {
    return function (dispatch) {
        let new_word;
        words_db
            .add(word)
            .then((doc) => {
                new_word = { ...word, id: doc.id };
            })
            .then((res) => dispatch(addWord(new_word)));
    };
};

// function completed toggle 
export const updateCompleteFB = (word) => {
    return function (dispatch) {
        words_db.doc(word.id).update({ completed: !word.completed });
        dispatch(updateComplete(word.id));
    };
};

// function word content modify
export const modifyWordFB = (word, id) => {
    return function (dispatch) {
        words_db.doc(word.id).update(word);
        const new_word = { ...word, id };
        dispatch(modifyWord(new_word));
    };
};


// function word delete
export const deleteWordFB = (id) => {
    return function (dispatch) {
        words_db.doc(id).delete();
        dispatch(deleteWord(id));
    };
};

// reducer
function words(state = inintialState, action) {
    switch (action.type) {
        case "words/LOAD":
            return {
                ...state,
                word_list: action.words,
                lastValue: action.lastValue,
            };
        case "words/LOAD_MORE":
            return {
                ...state,
                word_list: [...state.word_list, ...action.words],
                lastValue: action.lastValue,
            };
        case "word/ADD":
            let added_words = [...state.word_list, action.word];
            return {
                ...state,
                word_list: added_words,
            };
        case "word/COMPLETE":
            const new_word_list = state.word_list.map((word) =>
                word.id === action.id ? { ...word, completed: !word.completed } : word
            );
            return {
                ...state,
                word_list: new_word_list,
            };
        case "word/MODIFY":
            let modified_words = state.word_list.map((word) =>
                word.id === action.word.id ? { ...word, ...action.word } : word
            );
            return {
                ...state,
                word_list: modified_words,
            };
        case "word/DELETE":
            let left_words = state.word_list.filter((word) => word.id !== action.id);
            return {
                ...state,
                word_list: left_words,
            };
        default:
            return state;
    }
}


export default words;