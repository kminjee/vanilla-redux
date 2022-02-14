import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from '../store';
import ToDo from '../components/ToDo';

// getState : 현재 state를 보여줌
// dispatch : store 또는 reducer에 메시지를 전달


function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    setText("");
    addToDo(text);
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => 
          <ToDo {...toDo} key={toDo.id} />
        )}
      </ul>
    </>
  );
}

// mapStateToProps() : redux로부터 store의 state를 component에 props로 전달
// state는 redux store로부터 온것, ownProps는 component의 props.
function mapStateToProps(state) {
  return { toDos: state };
}

// addToDo는 dispatch를 호출 -> dispatch는 store의 actionCreators를 호출 -> actionCreators에 있는 addToDo에 text를 전달 
function mapDispatchToProps(dispatch) {
  return { 
    addToDo: text => dispatch(add(text))
  }
}

// store와 component를 connect 
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// 만약 mapState가 필요없고 dispatch만 필요한 경우에는 
// export default connect(null, mapDispatchToProps) 라고 쓰면 된다.

