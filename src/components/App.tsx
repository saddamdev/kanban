import React, { useState } from 'react';
import Header from './Header';
import KanbanStore, { ListType } from './KanbanStore';
import KanbanList from './KanbanList';
import KanbanForm from './KanbanForm';

const initialState: ListType = [
  {
    listTitle: 'Todo',
    todos: [
      { todo: 'This card is draggable', isDraggable: true },
      { todo: 'This card is not draggable', isDraggable: false },
      { todo: 'Double click to edit this card', isDraggable: true },
      { todo: 'Double click on title to edit', isDraggable: true },
    ],
  },
  {
    listTitle: 'In Progress',
    todos: [{ todo: 'Check out all features', isDraggable: true }],
  },
  {
    listTitle: 'Done',
    todos: [{ todo: 'Add some lists and cards', isDraggable: true }],
  },
];

const App: React.FC = () => {
  const [lists, setLists] = useState<ListType>(initialState);
  const store = new KanbanStore(lists, setLists);

  return (
    <>
      <Header />
      {store.lists.map((list, index) => (
        <KanbanList
          key={index}
          id={index}
          kanbanList={list}
          onDelete={store.deleteList}
          onAddTodo={store.addTodo}
          onDeleteTodo={store.deleteTodo}
          onSetTodos={store.setTodos}
          onUpdateTitle={store.updateTitle}
          onUpdateTodo={store.updateTodo}
          switchDraggable={store.toggleDraggable}
        />
      ))}
      <KanbanForm onAdd={store.addList} />
    </>
  );
};

export default App;
