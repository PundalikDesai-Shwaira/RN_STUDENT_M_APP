// // // // App.js
// // // import React, { useEffect,useState } from 'react';
// // // import { Alert, View, Text, StyleSheet } from 'react-native';
// // // import SQLite from 'react-native-sqlite-2';

// // // const DB_NAME = 'MyTestDB.db';
// // // const DB_VERSION = '1.0';
// // // const DB_DESC = '';
// // // const DB_SIZE = 1;

// // // // Table name constant
// // // const TABLE_NAME = 'courses';  

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // // });

// // // const App = () => {

// // //    // 📌 State to store DB name after creation
// // //   const [dbStatus, setDbStatus] = useState('');
// // //   // 📌 State to store Table name  status
// // //   const [tableStatus, setTableStatus] = useState(''); 
  
  

// // //   useEffect(() => {
// // //     createDatabase();
// // //   }, []);

// // //   const createDatabase = async () => {
// // //     try {
// // //       const db = SQLite.openDatabase(DB_NAME, DB_VERSION, DB_DESC, DB_SIZE);

// // //       const createTableSQL = `
// // //         CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
// // //           id INTEGER PRIMARY KEY AUTOINCREMENT,
// // //           name TEXT NOT NULL
// // //           fees INTEGER NOT NULL
// // //         )
// // //       `;

// // //       await new Promise((resolve, reject) => {
// // //         db.transaction(
// // //           (tx) => {
// // //             tx.executeSql(createTableSQL);
        

// // //           },
// // //           (txError) => {
// // //             reject(txError);
// // //           },
// // //           () => {
// // //             resolve();
// // //           }
// // //         );
// // //       });
      
// // //        // 🔥 Update screen text after success  
// // //       setDbStatus(`Database created: ${DB_NAME}`);
// // //       setTableStatus(`Table created: ${TABLE_NAME} `);
      
// // //       // 🔥 Success Alert 
// // //       Alert.alert('Success', 'Database & table created successfully!');

// // //     } catch (error) {
// // //       const msg = error?.message ? error.message : String(error);
// // //       Alert.alert('Error', 'Failed to create database: ' + msg);
// // //     }
// // //   };

// // //   const boldStyle = { marginTop: 10, fontSize: 16, fontWeight: 'bold' };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text>SQLite Database Demo (react-native-sqlite-2)</Text>
// // //       {/* 📌 Show DB name only after it is created */}
// // //       {dbStatus !== '' && (
// // //         <Text style={boldStyle}>
// // //           {dbStatus}
// // //         </Text>
// // //       )}

// // //       {/* 📌 Show table ame only after it is created */}
// // //       {tableStatus !== '' && (
// // //         <Text style={boldStyle}>
// // //           {tableStatus}
// // //         </Text>
// // //       )}


// // //     </View>
// // //   );
// // // };

// // // export default App;




// // // App.js
// // import React, { useEffect, useState } from 'react';
// // import { Alert, View, Text, StyleSheet } from 'react-native';
// // import SQLite from 'react-native-sqlite-2';

// // const DB_NAME = 'MyTestDB.db';
// // const DB_VERSION = '1.0';
// // const DB_DESC = '';
// // const DB_SIZE = 1;

// // // Table name constants
// // const TABLE_COURSES = 'courses';
// // const TABLE_SUBJECTS = 'subjects';

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// // const App = () => {
// //   const [dbStatus, setDbStatus] = useState('');
// //   const [tableStatusCourses, setTableStatusCourses] = useState('');
// //   const [tableStatusSubjects, setTableStatusSubjects] = useState('');

// //   useEffect(() => {
// //     createDatabaseAndTables();
// //   }, []);

// //   const createDatabaseAndTables = async () => {
// //     try {
// //       const db = SQLite.openDatabase(DB_NAME, DB_VERSION, DB_DESC, DB_SIZE);

      
// //       const createCoursesSQL = `
// //         CREATE TABLE IF NOT EXISTS ${TABLE_COURSES} (
// //           id INTEGER PRIMARY KEY AUTOINCREMENT,
// //           name TEXT NOT NULL,
// //           fees INTEGER NOT NULL
// //         );
// //       `;

// //       // example subjects table: references course via course_id (no enforced FK unless PRAGMA used)
// //       const createSubjectsSQL = `
// //         CREATE TABLE IF NOT EXISTS ${TABLE_SUBJECTS} (
// //           id INTEGER PRIMARY KEY AUTOINCREMENT,
// //           name TEXT NOT NULL,
// //           course_id INTEGER
// //           FOREIGN KEY (course_id) REFERENCES ${TABLE_COURSES}(id)
// //         );
// //       `;

// //       // run both CREATE TABLE statements inside the same transaction for atomicity
// //       await new Promise((resolve, reject) => {
// //         db.transaction(
// //           (tx) => {
// //             // execute first create
// //             tx.executeSql(
// //               createCoursesSQL,
// //               [],
// //               // statement success callback (optional)
// //               () => {},
// //               // statement error callback: return false to let transaction error handler run
// //               (_, stmtErr) => {
// //                 console.warn('createCoursesSQL error', stmtErr);
// //                 return false;
// //               }
// //             );

// //             // execute second create
// //             tx.executeSql(
// //               createSubjectsSQL,
// //               [],
// //               () => {},
// //               (_, stmtErr) => {
// //                 console.warn('createSubjectsSQL error', stmtErr);
// //                 return false;
// //               }
// //             );
// //           },
// //           (txError) => {
// //             // transaction-level error
// //             reject(txError);
// //           },
// //           () => {
// //             // transaction success
// //             resolve();
// //           }
// //         );
// //       });

// //       // Update UI status after successful transaction
// //       setDbStatus(`Database created: ${DB_NAME}`);
// //       setTableStatusCourses(`Table created: ${TABLE_COURSES}`);
// //       setTableStatusSubjects(`Table created: ${TABLE_SUBJECTS}`);

// //       Alert.alert('Success', 'Database & tables created successfully!');
// //     } catch (error) {
// //       const msg = error?.message ? error.message : String(error);
// //       Alert.alert('Error', 'Failed to create database/tables: ' + msg);
// //     }
// //   };

// //   const boldStyle = { marginTop: 10, fontSize: 16, fontWeight: 'bold' };

// //   return (
// //     <View style={styles.container}>
// //       <Text>SQLite Database Demo (react-native-sqlite-2)</Text>

// //       {dbStatus !== '' && <Text style={boldStyle}>{dbStatus}</Text>}
// //       {tableStatusCourses !== '' && <Text style={boldStyle}>{tableStatusCourses}</Text>}
// //       {tableStatusSubjects !== '' && <Text style={boldStyle}>{tableStatusSubjects}</Text>}
// //     </View>
// //   );
// // };

// // export default App;


// // //CRUD operations.  
// // export const insertCourse = async (db, name, fees) => {
// //     const insertSQL = `INSERT INTO ${TABLE_COURSES} (name, fees) VALUES (?, ?)`,[ name, fees ],(_, result) => {
// //         console.log('Course inserted with ID:', result.insertId);
// //     },(_, error) => {
// //         console.error('Error inserting course:', error);
// //     };
// // }

// // App.js
// import React, { useEffect, useState } from 'react';
// import { Alert, View, Text, StyleSheet } from 'react-native';
// // <-- updated import path to point to db/Database.js
// import { createDatabaseAndTables, TABLE_COURSES, TABLE_SUBJECTS } from './src/db/Database';
// import MainNavigator from './src/navigation/MainNavigator';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const App = () => {
//   const [dbStatus, setDbStatus] = useState('');
//   const [tableStatusCourses, setTableStatusCourses] = useState('');
//   const [tableStatusSubjects, setTableStatusSubjects] = useState('');

//   useEffect(() => {
//     (async () => {
//       try {
//         const db = await createDatabaseAndTables();
//         setDbStatus(`Database created: ${db?.name ?? 'MyTestDB'}`);
//         setTableStatusCourses(`Table creates: ${TABLE_COURSES}`);
//         setTableStatusSubjects(`Table created: ${TABLE_SUBJECTS}`);

//         Alert.alert('Success', 'Database & tables created successfully!');
//       } catch (error) {
//         const msg = error?.message ? error.message : String(error);
//         Alert.alert('Error', 'Failed to create database/tables: ' + msg);
//       }
//     })();
//   }, []);

//   const boldStyle = { marginTop: 10, fontSize: 16, fontWeight: 'bold' };

//   return (
//     <MainNavigator />
     
  
//   );
// };

// export default App;



import React, { useEffect } from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { initDB } from './src/db/Database';

const App = () => {
  useEffect(() => {
    initDB();
  }, []);

  return <MainNavigator />;
};

export default App;
