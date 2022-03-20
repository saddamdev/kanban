import React, { useState } from 'react';

interface KanbanFormProps {
  onAdd: (text: string) => void;
}

const KanbanForm: React.FC<KanbanFormProps> = (props) => {
  const [title, setTitle] = useState('');
  const [isExpanded, setExpanded] = useState(false);

  const submitTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length !== 0) {
      props.onAdd(title);
    }
    setTitle('');
  };

  return (
    <div className='container'>
      <form onSubmit={submitTitle}>
        <input
          type='text'
          placeholder={isExpanded ? 'Enter list title...' : '+ Add a list'}
          onFocus={(_) => setExpanded(true)}
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
        />
        {isExpanded && (
          <>
            <button type='submit'>Add list</button>
            <span className='pointer' onClick={(_) => setExpanded(false)}>
              ✖️
            </span>
          </>
        )}
      </form>
    </div>
  );
};

export default KanbanForm;
