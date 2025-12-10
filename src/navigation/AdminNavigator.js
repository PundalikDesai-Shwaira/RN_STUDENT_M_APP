

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Courses from '../screens/admin/Courses';
import AddCourse from '../screens/admin/AddCourse';
import Subjects from '../screens/admin/Subjects';
import AddSubject from '../screens/admin/AddSubject';
const Stack = createNativeStackNavigator();
const AdminNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
           
            <Stack.Screen name="Courses" component={Courses} />
            <Stack.Screen name="AddCourse" component={AddCourse} />
            <Stack.Screen name="Subjects" component={Subjects} />
            <Stack.Screen name="AddSubject" component={AddSubject} />
        </Stack.Navigator>
    );
}   
export default AdminNavigator;  