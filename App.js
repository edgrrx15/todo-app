import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const confettiRef = useRef(null);

  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Debes ingresar algo primero');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      important: false,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const handleToggleImportant = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleCompleted = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Trigger confetti if the task is now completed
    const completedTask = updatedTasks.find(task => task.id === id);
    if (completedTask.completed && confettiRef.current) {
      confettiRef.current.start();
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6 pt-14 bg-light">
      <Text className="text-5xl font-bold mb-4 text-blue">Lista de Tareas</Text>
      <View className="flex-row items-center mb-4">
        <TextInput
          className="flex-1 border border-teal-600 rounded-xl p-2 mr-2"
          value={task}
          onChangeText={text => setTask(text)}
          placeholder="Ingrese una nueva tarea"
          placeholderTextColor="#a1ada5"
        />
        <TouchableOpacity className="bg-blue rounded p-3" onPress={handleAddTask}>
          <Text className="text-white">
            <Ionicons name="add" size={24} color="#F8F6E3" />
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        className="w-full"
        data={tasks}
        renderItem={({ item }) => (
          <View
            className={`flex-row items-center justify-between p-4 mb-2 border border-green rounded-3xl ${item.important ? 'bg-lightgreen' : 'bg-white'} ${item.completed ? 'opacity-40' : ''}`}
          >
            <TouchableOpacity className="flex-1" onPress={() => setSelectedTask(item.id)}>
              <Text className={`text-lg ${item.completed ? 'line-through' : ''}`}>{item.text}</Text>
              {selectedTask === item.id && (
                <View className="flex-row mt-2">
                  <TouchableOpacity className="mr-4" onPress={() => handleToggleImportant(item.id)}>
                    <Text className={`text-sm ${item.important ? 'text-sky-700' : 'text-blue'}`}>
                      {item.important ? 'Importante' : 'Marcar como importante'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setTasks(tasks.filter(task => task.id !== item.id))}>
                    <Text className="text-sm text-red-500">Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleToggleCompleted(item.id)}>
              <Ionicons name={item.completed ? "checkmark-circle" : "radio-button-off-outline"} size={24} color={item.completed ? "#32CD32" : "#7AA2E3"} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <ConfettiCannon ref={confettiRef} count={300} origin={{ x: -10, y: 0 }} autoStart={false} fadeOut={true} />
    </View>
  );
};

export default App;
