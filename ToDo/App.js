import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyles from './styles/appStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [, forceUpdate] = useState(0); // force re-render for dynamic days

  // Load tasks from storage
  useEffect(() => {
    AsyncStorage.getItem('tasks')
      .then((saved) => saved && setTasks(JSON.parse(saved)))
      .catch((err) => console.log(err));
  }, []);

  // Save tasks
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks)).catch((err) =>
      console.log(err)
    );
  }, [tasks]);

  // Force re-render every hour to update days remaining dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((n) => n + 1);
    }, 60 * 60 * 1000); // every hour
    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (!task.trim()) {
      Alert.alert('Task is empty', 'Please enter a task.');
      return;
    }
    if (!deadline) {
      Alert.alert('Deadline missing', 'Please set a deadline.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: task,
      deadline: deadline.toString(),
      done: false, // new field for completion
    };

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTask('');
    setDeadline(null);
    setShowPicker(false);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const calculateDaysRemaining = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <View style={appStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8AB4F8" />
      <Text style={appStyles.title}>Todo</Text>
      <Text style={appStyles.subTitle}>Align your day</Text>

      {/* Task Input + Add */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TextInput
          placeholder="Enter task..."
          value={task}
          onChangeText={setTask}
          style={appStyles.input}
        />
        <TouchableOpacity
          onPress={addTask}
          style={{
            backgroundColor: deadline ? '#0057D9' : '#ccc',
            paddingVertical: 15,
            paddingHorizontal: 18,
            borderRadius: 10,
            marginTop: -2,
          }}
          disabled={!deadline}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            {editIndex !== null ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Deadline Picker */}
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          width: '90%',
          alignItems: 'center',
        }}
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          {deadline ? `Deadline: ${deadline.toLocaleDateString()}` : 'Set Deadline'}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <DateTimePicker
            value={deadline || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (selectedDate) setDeadline(selectedDate);
              setShowPicker(Platform.OS === 'ios');
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setDeadline(null);
              setShowPicker(false);
            }}
            style={{
              marginTop: 5,
              padding: 5,
              borderRadius: 5,
              backgroundColor: '#FF3B30',
              width: 120,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Cancel Deadline</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Task List */}
      <FlatList
        data={[...tasks]
          .sort((a, b) => a.done - b.done || new Date(a.deadline) - new Date(b.deadline))} // incomplete first, then by deadline
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => {
          const daysRemaining = calculateDaysRemaining(item.deadline);

          return (
            <View
              style={{
                ...appStyles.taskStyle,
                backgroundColor: item.done ? 'rgba(200,200,200,0.4)' : 'rgba(255, 255, 255, 0.85)',width:320
              }}
            >
              <View>
                <Text
                  style={{
                    ...appStyles.taskFont,
                    textDecorationLine: item.done ? 'line-through' : 'none',
                    color: item.done ? '#888' : '#222',
                  }}
                >
                  {item.text}
                </Text>
                {item.deadline && (
                  <Text style={{ fontSize: 12, color: daysRemaining <= 2 ? 'red' : '#555' }}>
                    Deadline: {new Date(item.deadline).toLocaleDateString()} ({daysRemaining} days left)
                  </Text>
                )}
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                {/* Toggle Complete */}
                <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                  <Text style={{ fontSize: 18 ,marginLeft:2,marginTop:15}}>{item.done ? '✔️' : '⬜'}</Text>
                </TouchableOpacity>

                {/* Edit */}
                <TouchableOpacity
                  onPress={() => {
                    setTask(item.text);
                    setDeadline(item.deadline ? new Date(item.deadline) : null);
                    setEditIndex(index);
                  }}
                >
                  <Text style={appStyles.up}>📝</Text>
                </TouchableOpacity>

                {/* Delete */}
                <TouchableOpacity onPress={() => removeTask(item.id)}>
                  <Text style={{ fontSize: 18,marginTop:14 }}>❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
