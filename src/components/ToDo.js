import React from 'react';
import { connect } from "react-redux";
import { remove } from '../store';
import { Link } from 'react-router-dom';

function ToDo ({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
};

function mapDispatchToProps(dispatch, ownProps) { // ownProps 에는 li 요소가 넘어옴
  return {
    onBtnClick: () => dispatch(remove(ownProps.id))
  };
};

// todo를 삭제할때는 state가 필요없으므로 connect할때는 null
export default connect(null, mapDispatchToProps)(ToDo);