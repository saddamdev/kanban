import React, { useState } from 'react';
import { TodosType } from './KanbanStore';
import Card from './Card';
import CardForm from './CardForm';

type ObjectType = { todo: string; isDraggable: boolean };

let fromListId: number;
let toListId: number;
let dragCardId: number;
let dragOverCardId: number;
let storeTodo: ObjectType;

interface KanbanListProps {
  id: number;
  kanbanList: {
    listTitle: string;
    todos: TodosType;
  };
  onDelete: (id: number) => void;
  onAddTodo: (id: number, text: string) => void;
  onDeleteTodo: (listId: number, todoId: number) => void;
  onSetTodos: (id: number, newTodos: TodosType) => void;
  onUpdateTitle: (id: number, text: string) => void;
  onUpdateTodo: (listId: number, todoId: number, text: string) => void;
  switchDraggable: (listId: number, todoId: number) => void;
}

const KanbanList: React.FC<KanbanListProps> = (props) => {
  const [isTitleEditing, setTitleEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const addTodo = (text: string) => {
    props.onAddTodo(props.id, text);
  };

  const dragStart = (id: number, object: ObjectType) => {
    fromListId = props.id;
    dragCardId = id;
    storeTodo = object;
  };

  const dragEnter = (id: number) => {
    dragOverCardId = id;
  };

  const switchCardPosition = () => {
    const copyTodos = [...props.kanbanList.todos];
    if (fromListId !== toListId) {
      copyTodos.splice(dragOverCardId, 0, storeTodo);
    } else {
      copyTodos.splice(dragCardId, 1);
      copyTodos.splice(dragOverCardId, 0, storeTodo);
    }
    props.onSetTodos(props.id, copyTodos);
  };

  const deleteCard = () => {
    if (fromListId !== toListId) {
      props.onDeleteTodo(props.id, dragCardId);
    }
  };

  const submitNewTitle = () => {
    if (newTitle.trim().length !== 0) {
      props.onUpdateTitle(props.id, newTitle);
    }
    setNewTitle('');
    setTitleEditing(false);
  };

  return (
    <div className='container'>
      {isTitleEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitNewTitle();
          }}
        >
          <input
            type='text'
            autoFocus={true}
            defaultValue={props.kanbanList.listTitle}
            onChange={(e) => setNewTitle(e.currentTarget.value)}
            onBlur={(_) => submitNewTitle()}
          ></input>
        </form>
      ) : (
        <div className='title-container'>
          <span className='title' onDoubleClick={(_) => setTitleEditing(true)}>
            {props.kanbanList.listTitle}
          </span>
          <span
            className='pointer'
            onClick={(_) => {
              props.onDelete(props.id);
            }}
          >
            ✖️
          </span>
        </div>
      )}

      <div
        className='card-container'
        onDragOver={(e) => e.preventDefault()}
        onDrop={(_) => {
          toListId = props.id;
          switchCardPosition();
        }}
        onDragEnd={(_) => deleteCard()}
      >
        {props.kanbanList.todos.map((object, index) => (
          <Card
            key={index}
            listId={props.id}
            cardId={index}
            todo={object.todo}
            isDraggable={object.isDraggable}
            onStart={dragStart}
            onEnter={dragEnter}
            onDelete={props.onDeleteTodo}
            onUpdate={props.onUpdateTodo}
            toggleDraggable={props.switchDraggable}
          />
        ))}
      </div>
      <CardForm onAdd={addTodo} />
    </div>
  );
};

export default KanbanList;
