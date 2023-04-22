import React, { useState, useEffect } from 'react';
import MemoItem from './MemoItem';
import MemoForm from './MemoForm';
import supabase from '../supabaseClient';

const MemoList = () => {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);

  // 메모 데이터를 불러오는 함수
  const fetchMemos = async () => {
    const { data, error } = await supabase.from('aimo').select('*').order('id', { ascending: false });

    if (error) {
      console.error('Error fetching memos:', error);
    } else {
      setMemos(data);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // const handleMemoFormSubmit = async () => {
  //   await fetchMemos();
  //   setSelectedMemo(null);
  // }

  const handleSelectMemo = (memo) => {
    setSelectedMemo(memo);
  };


  return (
    <div>
      
      <header className="app-header">
        <h1>TARAE</h1>
      </header>
      
      <div className="input-area">
        <MemoForm memo={selectedMemo} fetchMemos={fetchMemos} />
      </div>

      <div className="list-area">
        {memos.map((memo) => (
          <MemoItem 
            key={memo.id} 
            memo={memo} 
            setSelectedMemo={setSelectedMemo}
            onSelectMemo={handleSelectMemo}
            isSelected={selectedMemo && memo.id === selectedMemo.id}
            />
        ))}
      </div>
    </div>
  );
};

export default MemoList;
