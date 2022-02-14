import { createStore } from 'redux';

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// 오로지 action만을 return 하는 function. (코드를 최적화하는 방법)
const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  }
}

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}


// 새로운 요소를 추가할 때는 기존의 state를 수정하는 것이 아니라 기존의 state를 복사한 new state에 추가한다.
// ** 절대 state를 mutate 하지 않는다. state를 변경하지 않는다. **
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      // filter 조건에 해당하는 것들로 새 array를 생성 -> 삭제하려는 id가 일치하지 않는 것들만
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  };
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
}

const dispatchDeleteToDo = e => {
  // id값을 정확하게 하기 위한 int 형변환
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}

// repaint 하는 방법은 새로운 todo가 생기면 list 전체를 비우고 state에 있는 각각의 todo를 이용해 새로운 list를 만든다.
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);