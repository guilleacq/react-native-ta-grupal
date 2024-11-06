import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TaskItem from '../../components/TA/TaskItem';
import NewTaskSheet from '../../components/TA/NewTaskSheet';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    id: '',
    name: '',
    description: '',
    image: null,
    isDone: false,
  });

  const bottomSheetRef = useRef(null);
  const snapPoints = ['10%', '80%'];

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se requieren permisos de cámara para usar esta función');
      }
      loadTasks();
    })();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error al guardar las tareas:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewTask({ ...newTask, image: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewTask({ ...newTask, image: result.assets[0].uri });
    }
  };

  const addTask = () => {
    if (!newTask.name.trim()) {
      Alert.alert('Error', 'El nombre de la tarea es requerido');
      return;
    }

    const updatedTasks = [
      ...tasks,
      {
        ...newTask,
        id: Date.now().toString(),
      },
    ];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    closeBottomSheet();
  };

  const deleteTask = (taskId) => {
    Alert.alert(
      'Eliminar Tarea',
      '¿Estás seguro que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setNewTask({ id: '', name: '', description: '', image: null, isDone: false });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Tareas</Text>

        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onToggleStatus={toggleTaskStatus}
              onDelete={deleteTask}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={openBottomSheet}
        >
          <Text style={styles.addButtonText}>+ Nueva Tarea</Text>
        </TouchableOpacity>

        <AddNewSheet
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          newTask={newTask}
          onNewTaskChange={setNewTask}
          onTakePhoto={takePhoto}
          onPickImage={pickImage}
          onClose={closeBottomSheet}
          onSave={addTask}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});