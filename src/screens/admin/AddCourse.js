import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState} from 'react';
import { insertCourse } from '../../db/Database';


const AddCourse = () => {
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');
  const [message, setMessage] = useState({ type: '', msg: '' })

  return (
    <View style={styles.container} >
      <TextInput value={name} onChangeText={setName} placeholder ="Enter Course " style={styles.input} placeholderTextColor="darkgrey"/>
      <TextInput  value={fees} onChangeText={setFees} placeholder ="Enter Course Fees" style={styles.input} placeholderTextColor="darkgrey"/>
      
      //displaying msg as 'course already exist' or 'course added successfully'
      {message.msg !== ''&&(
        <Text style={{color:message.type ==='error'?'red':'green',marginBottom:10}}>{message.msg}</Text>
      )}
      
      
      
      
      
      
      
      
      
      <TouchableOpacity
      onPress={()=>{
        insertCourse(name, parseInt(fees, 10), (res)=>{
          Alert.alert('Success', 'Course added successfully');
          console.log('Insert Course Result', res);
          setName('');
          setFees('');
          setMessage({type:'success',msg:'Course added succesfully'})
          )
        }, (err)=>{
          Alert.alert('Error', 'Failed to add course: '+ err);
          setMessage({type:'error'.msg:'failed to add course:'+err})
        });
      }}
      style={styles.submitBtn} >
        <Text style={styles.btnTxt}> Submit Course </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddCourse

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#cccccc',
    paddingLeft: 20,
    color: 'black',
    marginBottom: 10,

  },
  submitBtn: {
    width: '90%',
    height: 50,
    marginTop:20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  }
})