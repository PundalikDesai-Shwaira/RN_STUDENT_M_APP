import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const UserSelection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose User Type</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('AdminNavigator')}
      >
        <Text style={styles.btnTxt}>I am Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('StudentNavigator')}
      >
        <Text style={styles.btnTxt}>I am Student</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  btn: {
    width: '70%',
    padding: 15,
    backgroundColor: '#4a90e2',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
