import * as SQLite from "expo-sqlite";

const database_name = "AppDatabase.db";
const database_version = "1.0";
const database_displayname = "Todo App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS hikes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          location TEXT,
          date TEXT,
          parkingStatus TEXT,
          length INTEGER,
          difficulty TEXT,
          description TEXT
        );`,
        [],
        () => console.log("Hike table created successfully."),
        (error) => console.log("Error occurred while creating the table.", error)
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS observations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nameObservation TEXT,
            dateTime TEXT,
            comment TEXT,
            hikeId INTEGER,
            FOREIGN KEY (hikeId) REFERENCES hikes(id)
          );`,
        [],
        () => console.log("Observation table created successfully."),
        (error) =>
          console.log(
            "Error occurred while creating the table.",
            error
          )
      );
    });
  };
  
  const getHikes = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM hikes",
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const getObservations = (hikeId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM observations WHERE hikeId = ?",
          [hikeId],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  const deleteHike = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM hikes WHERE id = ?",
          [id],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const deleteObservation = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM observations WHERE id = ?",
          [id],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const deleteAllHike = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM hikes",
          [],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  const addHike = (name, location, date, parkingStatus, length, difficulty, description) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO hikes (name, location, date, parkingStatus, length, difficulty, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, location, date, parkingStatus, length, difficulty, description],
          (_, { insertId }) => {
            resolve(insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const addObservation = (nameObservation, dateTime, comment, hikeId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO observations (nameObservation, dateTime, comment, hikeId) VALUES (?, ?, ?, ?)",
          [nameObservation, dateTime, comment, hikeId],
          (_, { insertId }) => {
            resolve(insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const updateHike = (id,name, location, date, parkingStatus, length, difficulty, description) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE hikes SET name=?, location=?, date=?, parkingStatus=?, length=?, difficulty=?, description=? where id=?",
          [name, location, date, parkingStatus, length, difficulty, description, id],
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const updateObservation = (id,nameObservation, dateTime, comment) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE observations SET nameObservation=?, dateTime=?, comment=? where id=?",
          [nameObservation, dateTime, comment, id],
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const searchHikes = (query) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM hikes WHERE name LIKE ?",
        [`%${query}%`],
        (_,{rows}) => {
          resolve(rows._array);
        },
        (_,error) => {
          reject(error);
        }
        );
      })
    })
  }

  const Database = {
    initDatabase,
    addHike,
    getHikes,
    deleteHike,
    updateHike,
    deleteAllHike,
    searchHikes,
    getObservations,
    addObservation,
    deleteObservation,
    updateObservation
  };
  
  export default Database;