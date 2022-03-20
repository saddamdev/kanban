import React from 'react';

export type TodosType = { todo: string; isDraggable: boolean }[];
export type ListType = {
  listTitle: string;
  todos: TodosType;
}[];
type SetStateType = React.Dispatch<React.SetStateAction<ListType>>;

class KanbanStore {
  lists: ListType;
  setLists: SetStateType;

  constructor(state: ListType, action: SetStateType) {
    this.lists = state;
    this.setLists = action;
  }

  addList = (text: string) => {
    this.setLists((prevLists) => [
      ...prevLists,
      { listTitle: text, todos: [] },
    ]);
  };

  deleteList = (id: number) => {
    this.setLists((prevLists) => prevLists.filter((_, index) => index !== id));
  };

  addTodo = (id: number, text: string) => {
    const updatedLists = this.lists.map((list, index) => {
      if (index === id) {
        list.todos.push({ todo: text, isDraggable: true });
      }
      return list;
    });
    this.setLists(updatedLists);
  };

  deleteTodo = (listId: number, todoId: number) => {
    const updatedLists = this.lists.map((list, index) => {
      if (index === listId) {
        list.todos.splice(todoId, 1);
      }
      return list;
    });
    this.setLists(updatedLists);
  };

  setTodos = (id: number, newTodos: TodosType) => {
    const updatedLists = this.lists.map((list, index) => {
      if (index === id) {
        list.todos = newTodos;
      }
      return list;
    });
    this.setLists(updatedLists);
  };

  updateTitle = (id: number, text: string) => {
    const updatedLists = this.lists.map((list, index) => {
      if (index === id) {
        list.listTitle = text;
      }
      return list;
    });
    this.setLists(updatedLists);
  };

  updateTodo = (listId: number, todoId: number, text: string) => {
    const updatedLists = this.lists.map((list, index) => {
      if (index === listId) {
        list.todos[todoId].todo = text;
      }
      return list;
    });
    this.setLists(updatedLists);
  };

  toggleDraggable = (listId: number, todoId: number) => {
    const updatedLists = this.lists.map((list, index) => {
      if (index === listId) {
        list.todos[todoId].isDraggable = !list.todos[todoId].isDraggable;
      }
      return list;
    });
    this.setLists(updatedLists);
  };
}

export default KanbanStore;
