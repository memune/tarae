import React, { useState } from 'react';
import MemoForm from './MemoForm';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


const MemoItem = ({ memo, setSelectedMemo, handleSelectMemo, selectedMemo }) => {

  const handelClick = () => {
    setSelectedMemo(memo);
  }  

  const isSelected = selectedMemo && selectedMemo.id === memo.id;

  return (
    <div className={`memo-item ${isSelected ? 'selected' : ''}`} onClick={handelClick}>
      <p>{memo.content}</p>
    </div>
  );
};


export default MemoItem;
