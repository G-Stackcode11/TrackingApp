// MetadataForm.js
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  animalId: yup.string().required('Animal ID is required'),
  age: yup.number().required('Age is required').positive().integer(),
  health: yup.string().required('Health status is required'),
  bcs: yup.number().required('BCS is required').min(1).max(9),
  remarks: yup.string().optional(),
  stageOfLactation: yup.string().required('Stage of lactation is required'),
  dateOfCalving: yup.string().required('Date of calving is required'),
  lactationNumber: yup.number().required('Lactation number is required').positive().integer(),
  dob: yup.string().required('DOB is required'),
});

export default function MetadataForm({ onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const fields = [
    { name: 'animalId', label: 'Animal ID' },
    { name: 'age', label: 'Age', keyboard: 'numeric' },
    { name: 'health', label: 'Health' },
    { name: 'bcs', label: 'Body Condition Score', keyboard: 'numeric' },
    { name: 'remarks', label: 'Remarks' },
    { name: 'stageOfLactation', label: 'Stage of Lactation' },
    { name: 'dateOfCalving', label: 'Date of Calving (YYYY-MM-DD)' },
    { name: 'lactationNumber', label: 'Lactation Number', keyboard: 'numeric' },
    { name: 'dob', label: 'Date of Birth (DD-MM-YYYY)' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Animal Metadata</Text>
      {fields.map(({ name, label, keyboard }) => (
        <View key={name}>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={label}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboard || 'default'}
              />
            )}
          />
          {errors[name] && <Text style={styles.error}>{errors[name]?.message}</Text>}
        </View>
      ))}

      <Button title="Save Metadata" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 5, borderRadius: 5 },
  error: { color: 'red', marginBottom: 5 },
});
