import React, { useState } from 'react';

interface CardProps {
  listId: number;
  cardId: number;
  todo: string;
  isDraggable: boolean;
  onStart: (id: number, object: { todo: string; isDraggable: boolean }) => void;
  onEnter: (id: number) => void;
  onDelete: (listId: number, cardId: number) => void;
  onUpdate: (listId: number, cardId: number, text: string) => void;
  toggleDraggable: (listId: number, todoId: number) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const [isTodoEditing, setTodoEditing] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const submitNewTodo = () => {
    if (newTodo.trim().length !== 0) {
      props.onUpdate(props.listId, props.cardId, newTodo);
    }
    setNewTodo('');
    setTodoEditing(false);
  };

  return isTodoEditing ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitNewTodo();
      }}
    >
      <input
        type='text'
        autoFocus={true}
        defaultValue={props.todo}
        onChange={(e) => setNewTodo(e.currentTarget.value)}
        onBlur={(_) => submitNewTodo()}
      ></input>
    </form>
  ) : (
    <div
      className='card grab'
      draggable={props.isDraggable}
      onDragStart={(_) =>
        props.onStart(props.cardId, {
          todo: props.todo,
          isDraggable: props.isDraggable,
        })
      }
      onDragEnter={(_) => props.onEnter(props.cardId)}
    >
      <span className='todo' onDoubleClick={(_) => setTodoEditing(true)}>
        {props.todo}
      </span>
      <span
        className='pointer'
        onClick={(_) => props.toggleDraggable(props.listId, props.cardId)}
      >
        {props.isDraggable ? '✔️' : '🛑'}
      </span>
      <span
        className='pointer'
        onClick={(_) => {
          props.onDelete(props.listId, props.cardId);
        }}
      >
        ❌
      </span>
    </div>
  );
};

export default Card;
