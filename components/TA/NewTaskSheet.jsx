import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const AddTaskSheet = ({ 
  bottomSheetRef, 
  snapPoints, 
  newTask, 
  onNewTaskChange, 
  onTakePhoto, 
  onPickImage, 
  onClose, 
  onSave 
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
          <Text style={styles.modalTitle}>Nueva Tarea</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre de la tarea"
            placeholderTextColor='#999'
            value={newTask.name}
            onChangeText={(text) => onNewTaskChange({ ...newTask, name: text })}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            placeholderTextColor="#999"
            value={newTask.description}
            onChangeText={(text) => onNewTaskChange({ ...newTask, description: text })}
            multiline
          />

          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
              <Text style={styles.buttonText}>Tomar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onPickImage}>
              <Text style={styles.buttonText}>Elegir de Galería</Text>
            </TouchableOpacity>
          </View>

          {newTask.image && (
            <Image
              source={{ uri: newTask.image }}
              style={styles.previewImage}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={onSave}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
});

export default NewTaskSheet;