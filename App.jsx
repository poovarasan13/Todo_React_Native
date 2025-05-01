import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';

const App = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  
  const handleAddTask = () => {
    if (taskText.trim() === '') return;

    const newTask = {
      id: Date.now().toString(),
      title: taskText,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
  };

 
  const handleEditPress = (id, currentTitle) => {
    setIsEditing(id);
    setEditText(currentTitle);
  };


  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editText } : task
      )
    );
    setIsEditing(null);
  };


  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  
  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      {isEditing === item.id ? (
        <>
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
          />
          <Pressable
            style={styles.saveButton}
            onPress={() => handleSaveEdit(item.id)}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <View style={styles.taskActions}>
            <Pressable
              style={styles.editButton}
              onPress={() => handleEditPress(item.id, item.title)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Todo App</Text>
      </View>

      <View style={styles.taskInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <Pressable style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 30,
    color: 'red',
  },
  taskInputContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    width: '90%',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    flexDirection:'row',
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    width:"50%",
  },
  taskActions: {
   
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginVertical:5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;