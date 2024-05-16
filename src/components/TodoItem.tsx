import React from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import TodoItemType from '../types/TodoItem';
import { AntDesign } from '@expo/vector-icons';

const RightSwipeActions = ({
  item,
  onDelete,
  progress,
  onEdit, // Adicionando onEdit como prop
}: {
  item: TodoItemType;
  onDelete: (item: TodoItemType) => void;
  progress: Animated.AnimatedInterpolation<number>;
  onEdit: (item: TodoItemType) => void; // Adicionando onEdit como prop
}) => {
  const transform = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.item,
          {
            backgroundColor: 'lightgreen',
            alignItems: 'flex-end',
            transform: [{ translateX: transform }],
          },
        ]}
      >
        <TouchableOpacity onPress={() => onEdit(item)}> {/* Chamando onEdit ao pressionar */}
          <View style={styles.iconContainer}>
            <AntDesign name="edit" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.item,
          styles.item2,
          {
            backgroundColor: 'lightcoral',
            alignItems: 'flex-end',
            transform: [{ translateX: transform }],
          },
        ]}
      >
        <TouchableOpacity onPress={() => onDelete(item)}>
          <View style={styles.iconContainer}>
            <AntDesign name="delete" size={18} color="black" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const TodoItem = ({
  todoItem,
  onDelete,
  onEdit,
}: {
  todoItem: TodoItemType;
  onDelete: (item: TodoItemType) => void;
  onEdit: (item: TodoItemType) => void; // Adicionando onEdit como prop
}) => {
  return (
    <Swipeable
      renderRightActions={(progressAnimatedValue: Animated.AnimatedInterpolation<string | number>) => (
        <RightSwipeActions
          item={todoItem}
          onDelete={onDelete}
          progress={progressAnimatedValue}
          onEdit={onEdit} // Passando onEdit como prop
        />
      )}
    >
      <View style={styles.item}>
        <Text style={styles.itemText} numberOfLines={1} selectable>
          {todoItem.description}
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  item: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  item2: {
    backgroundColor: 'green',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TodoItem;