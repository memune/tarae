  import React, { useState, useEffect } from 'react';
  import supabase from '../supabaseClient';

const MemoForm = ({ memo, fetchMemos, isNewMemo, setIsNewMemo }) => {
    const [content, setContent] = useState('');
  
    useEffect(() => {
      if (memo) {
        setContent(memo.content);
      }
    }, [memo]);


    const handleSubmit = async (e) => {
      e.preventDefault();

      if (memo) {
        // 기존 메모 수정
        const { data, error } = await supabase
          .from('aimo')
          .update({ content, updated_at: new Date() })
          .match({ id: memo.id });

        if (error) {
          console.error('Error updating memo:', error);
        } else {
          fetchMemos();
        }
      } else {
        // 새 메모 생성
        const { data, error } = await supabase
          .from('aimo')
          .insert([{ content, updated_at: new Date() }]);
    
        if (error) {
          console.error('Error creating memo:', error);
        
        } else {
          // 폼 초기화
          setContent('');
          setIsNewMemo(true);
          fetchMemos();
          
        }
      }
    };

      const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
          handleSubmit(e);
        }
      };

      // isNewMemo 값이 true일 경우 content 초기화
      useEffect(() => {
        if (isNewMemo) {
          setContent('');
          setIsNewMemo(false);
        }
      }, [isNewMemo, setIsNewMemo]);
    
      return (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Record your ideas"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown} // onKeyDown 이벤트 추가
          />
          <button type="submit">{memo ? 'Save' : 'Add'}</button>
        </form>
      );
    };

  export default MemoForm;
