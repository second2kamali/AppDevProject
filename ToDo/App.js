import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyles from './styles/appStyles';
import { StatusBar } from 'react-native';
import * as Speech from 'expo-speech';



export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  
  // 🔹 Load saved tasks from AsyncStorage when app starts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
      } catch (err) {
        console.log('Error loading tasks:', err);
      }
    };
    loadTasks();
  }, []);

  // 🔹 Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (err) {
        console.log('Error saving tasks:', err);
      }
    };
    saveTasks();
  }, [tasks]);

  const add = () => {
    if (task.trim().length === 0) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      const newTask = { id: Date.now().toString(), text: task };
      setTasks([...tasks, newTask]);
    }

    setTask('');
  };

  const removeTask = (id) => {
    const remove = tasks.filter((item) => item.id !== id);
    setTasks(remove);
  };

  return (
    <View style={appStyles.container}>
      <StatusBar 
        barStyle="light-content" // makes the icons white
        backgroundColor="#8AB4F8" // matches your container
      />
      <Text style={appStyles.title}>Todo</Text>
      <Text style={appStyles.subTitle}>Align your day</Text>

      <TextInput
        placeholder="Add task..."
        style={appStyles.input}
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={appStyles.button} onPress={add}>
        <Text style={appStyles.buttonText}>
          {editIndex !== null ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => (
          <View style={appStyles.taskStyle}>
            <Text style={appStyles.taskFont}>{item.text}</Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              {/* ✏️ Edit Button */}
              <TouchableOpacity
                onPress={() => {
                  setTask(item.text);
                  setEditIndex(index);
                }}
              >
                <Text style={appStyles.up}>📝</Text>
              </TouchableOpacity>

              {/* ❌ Delete Button */}
              <TouchableOpacity onPress={() => removeTask(item.id)}>
                <Text style={{ fontSize: 18 }}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
