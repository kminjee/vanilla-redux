import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

function Detail({ toDos }) {
  const id = useParams().id;
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id));

  return (
    <>
      <h1>{toDo?.text}</h1>
      <h3>Created at: {toDo?.id}</h3>
    </>
  );
}

function mapStateToProps (state) {
return { toDos: state };
}

export default connect(mapStateToProps)(Detail);



/*
  1. url parameter 값을 가져와 detail로 이동하는 방법

  function Detail() {

    const id = useParams();
    console.log(id);

    return (
      <h1>Detail</h1>
    )
  }

  export default Detail;
*/

/*
  2. state 값을 이용해 detail로 이동하는 방법

  function Detail({ toDos }) {
    return (
      <h1>Detail</h1>
    )
  }

  function mapStateToProps(state, ownProps) {
    return { toDos: state }
  }

  export default Detail;
*/