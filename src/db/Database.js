import SQLite from 'react-native-sqlite-2';

// Open database (react-native-sqlite-2 returns DB synchronously)
export const db = SQLite.openDatabase(
  { name: 'studentaap.db', location: 'default' },
  () => {
    console.log('database opened');
  },
  error => {
    console.log('error opening database', error);
  },
);

// Initialize tables
export const initDB = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS courses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          fees INTEGER
        );`,
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS subjects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          course_id INTEGER,
          FOREIGN KEY(course_id) REFERENCES courses(id)
        );`,
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          course_id INTEGER,
          FOREIGN KEY(course_id) REFERENCES courses(id)
        );`,
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS attendance (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER,
          date TEXT,
          status TEXT,
          FOREIGN KEY (student_id) REFERENCES students(id)
        );`,
      );
    },
    err => {
      console.log('initDB transaction error:', err);
    },
    () => {
      console.log('initDB transaction success');
    },
  );
};

// CRUD functions (callbacks preserved)
export const insertCourse = (name, fees, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM courses WHERE name = ?',
        [name],
        (_, { rows }) => {
          if (rows.length > 0) {
            error && error('course already exists');
          } else {
            tx.executeSql(
              'INSERT INTO courses (name, fees) VALUES (?, ?)',
              [name, fees],
              (_, res) => success && success(res),
              (_, err) => {
                error && error(err);
                return false;
              },
            );
          }
        },
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('Transaction Error:', err);
      error && error(err);
    },
  );
};

export const getCourses = callback => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM courses',
        [],
        (_, { rows }) => {
          const result = [];
          for (let i = 0; i < rows.length; i++) {
            result.push(rows.item(i));
          }
          callback && callback(result);
        },
        (_, err) => {
          console.log('getCourses err', err);
          return false;
        },
      );
    },
    err => console.log('getCourses transaction err', err),
  );
};

export const deleteCourse = (id, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'DELETE FROM courses WHERE id = ?',
        [id],
        (_, res) => success && success(res),
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('deleteCourse tx error', err);
      error && error(err);
    },
  );
};

export const updateCourse = (id, newName, newFees, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM courses WHERE name = ? AND id != ?',
        [newName, id],
        (_, { rows }) => {
          if (rows.length > 0) {
            error && error('course with this name already exists');
          } else {
            tx.executeSql(
              'UPDATE courses SET name = ?, fees = ? WHERE id = ?',
              [newName, newFees, id],
              (txRes, res) => success && success(res),
              (txEr, er) => {
                error && error(er);
                return false;
              },
            );
          }
        },
        (txErr, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('updateCourse tx error', err);
      error && error(err);
    },
  );
};

export const insertSubject = (name, courseId, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM subjects WHERE name = ? AND course_id = ?',
        [name, courseId],
        (_, { rows }) => {
          if (rows.length > 0) {
            error && error('subject already exists');
          } else {
            tx.executeSql(
              'INSERT INTO subjects (name, course_id) VALUES (?, ?)',
              [name, courseId],
              (_, res) => success && success(res),
              (_, err) => {
                error && error(err);
                return false;
              },
            );
          }
        },
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('insertSubject tx error', err);
      error && error(err);
    },
  );
};

export const getSubjects = (success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT subjects.id, subjects.name AS subject_name, courses.name AS course_name
         FROM subjects
         INNER JOIN courses ON subjects.course_id = courses.id`,
        [],
        (_, { rows }) => {
          const items = [];
          for (let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
          }
          success && success(items);
        },
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('getSubjects tx error', err);
      error && error(err);
    },
  );
};

export const getSubjectsByCourseId = (courseId, callback, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM subjects WHERE course_id = ?',
        [courseId],
        (_, { rows }) => {
          if (rows.length > 0) {
            const items = [];
            for (let i = 0; i < rows.length; i++) {
              items.push(rows.item(i));
            }
            callback && callback(items);
          } else {
            error && error('no subjects exist in this course');
          }
        },
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('getSubjectsByCourseId tx error', err);
      error && error(err);
    },
  );
};

export const insertStudent = (name, email, password, courseId, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO students (name, email, password, course_id) VALUES (?, ?, ?, ?)',
        [name, email, password, courseId],
        (_, res) => success && success(res),
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('insertStudent tx error', err);
      error && error(err);
    },
  );
};

export const loginStudent = (email, password, callback, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM students WHERE email = ? AND password = ?',
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            callback && callback(rows.item(0));
          } else {
            error && error('no user found');
          }
        },
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('loginStudent tx error', err);
      error && error(err);
    },
  );
};

export const markAttendance = (date, student_id, status, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM attendance WHERE date = ? AND student_id = ?',
        [date, student_id],
        (_, { rows }) => {
          if (rows.length > 0) {
            error && error('already marked');
          } else {
            tx.executeSql(
              'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
              [student_id, date, status],
              (_, res) => success && success(res),
              (_, err) => {
                error && error(err);
                return false;
              },
            );
          }
        },
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('markAttendance tx error', err);
      error && error(err);
    },
  );
};

export const getAttendanceByMonth = (studentId, month, year, callback, error) => {
  const mMonth = month.toString().padStart(2, '0');
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM attendance
         WHERE student_id = ?
           AND strftime('%m', date) = ?
           AND strftime('%Y', date) = ?
         ORDER BY date ASC`,
        [studentId, mMonth, year.toString()],
        (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          callback && callback(data);
        },
        (_, err) => {
          error && error(err);
          return false;
        },
      );
    },
    err => {
      console.log('getAttendanceByMonth tx error', err);
      error && error(err);
    },
  );
};


