import React from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ item, onToggleStatus, onDelete }) => (
  <View style={styles.taskItem}>
    {item.image && (
      <Image source={{ uri: item.image }} style={styles.taskImage} />
    )}
    <View style={styles.taskInfo}>
      <Text style={styles.taskName}>{item.name}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <View style={styles.taskControls}>
        <Switch
          value={item.isDone}
          onValueChange={() => onToggleStatus(item.id)}
        />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  taskControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default TaskItem;