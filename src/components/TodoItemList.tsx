import React from 'react';
import { FlatList, View } from 'react-native';
import TodoItemType from '../types/TodoItem';
import TodoItem from './TodoItem';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import { storageTodoListKey } from '../utils/constants';

type TodoItemProps = {
  onDelete: (item: TodoItemType) => void;
  onEdit: (item: TodoItemType) => void; // Adicionando onEdit como prop
};

const TodoItemList = ({ onDelete, onEdit }: TodoItemProps) => {
  const [lsTodoItem] = useAsyncStorage<TodoItemType[]>(storageTodoListKey, []);

  return (
    <FlatList
      style={{ width: '100%' }}
      data={lsTodoItem}
      renderItem={({ item }) => (
        <TodoItem todoItem={item} onEdit={onEdit} onDelete={onDelete} />
      )}
      keyExtractor={(item, i) => (item.id ?? i).toString()}
      contentContainerStyle={{ gap: 5, marginTop: 5 }}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
};

export default React.memo(TodoItemList);
