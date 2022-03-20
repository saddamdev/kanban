import React, { useState } from 'react';

interface CardFormProps {
  onAdd: (text: string) => void;
}

const CardForm: React.FC<CardFormProps> = (props) => {
  const [todo, setTodo] = useState('');
  const [isExpanded, setExpanded] = useState(false);

  const submitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim().length !== 0) {
      props.onAdd(todo);
    }
    setTodo('');
  };

  return (
    <form onSubmit={submitTodo}>
      <input
        type='text'
        placeholder={isExpanded ? 'Enter card title...' : '+ Add a card'}
        onFocus={(_) => setExpanded(true)}
        onChange={(e) => setTodo(e.currentTarget.value)}
        value={todo}
      />
      {isExpanded && (
        <>
          <button type='submit'>Add card</button>
          <span className='pointer' onClick={(_) => setExpanded(false)}>
            ✖️
          </span>
        </>
      )}
    </form>
  );
};

export default CardForm;
