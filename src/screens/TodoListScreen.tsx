import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ToDoStackParamList } from '../navigation/StackNavigator';
import Modal from '../components/Modal';
import TodoItemType from '../types/TodoItem';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import TodoItemList from '../components/TodoItemList';
import { storageTodoListKey } from '../utils/constants';

const initialTodoItem: TodoItemType = { id: 1, description: '', title: '' };

type TodoListScreenProps = NativeStackScreenProps<
  ToDoStackParamList,
  'TodoList'
>;

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [todoItem, setTodoItem] = React.useState<TodoItemType>(initialTodoItem);
  const [isEditing, setIsEditing] = React.useState(false);

  const [lsTodoItem, setLsTodoItem] = useAsyncStorage<TodoItemType[]>(
    storageTodoListKey,
    []
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setTodoItem(initialTodoItem);
            setIsEditing(false);
            setModalVisible(true);
          }}
          style={{ padding: 15 }}
        >
          <AntDesign name="pluscircle" size={24} color="darkseagreen" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleAddItem = async () => {
    if (!todoItem.title || !todoItem.description) {
      alert('Título ou descrição da tarefa inválida!');
      return;
    }

    if (isEditing) {
      const updatedItems = lsTodoItem.map((item) =>
        item.id === todoItem.id ? todoItem : item
      );
      setLsTodoItem(updatedItems);
    } else {
      const newItem = {
        ...todoItem,
        id: lsTodoItem.length ? lsTodoItem[lsTodoItem.length - 1].id + 1 : 1,
      };
      setLsTodoItem([...lsTodoItem, newItem]);
    }

    setTodoItem(initialTodoItem);
    setIsEditing(false);
    setModalVisible(false);
  };

  const handleDeleteItem = React.useCallback(
    (item: TodoItemType) => {
      const updatedItems = lsTodoItem.filter((todo) => todo.id !== item.id);
      setLsTodoItem(updatedItems);
    },
    [lsTodoItem]
  );

  const handleEditItem = (item: TodoItemType) => {
    setTodoItem(item);
    setIsEditing(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(!modalVisible)}
        title="Descreva a tarefa"
      >
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={todoItem.title}
          onChangeText={(textValue) =>
            setTodoItem((prev) => ({ ...prev, title: textValue }))
          }
        />

        <TextInput
          style={[styles.input, { minHeight: 80 }]}
          placeholder="Descrição"
          value={todoItem.description}
          onChangeText={(textValue) =>
            setTodoItem((prev) => ({ ...prev, description: textValue }))
          }
          multiline={true}
          numberOfLines={4}
        />

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleAddItem}
          >
            <Text style={styles.textStyle}>{isEditing ? 'Editar' : 'Adicionar'}</Text>
          </Pressable>
        </View>
      </Modal>

      <TodoItemList
        key={JSON.stringify(lsTodoItem)}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    minWidth: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginLeft: 'auto',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TodoListScreen;
