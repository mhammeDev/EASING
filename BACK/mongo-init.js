const fs = require('fs');
const path = require('path');

// this file allows to initialize the database when the application
// is launched with docker

class InitMongo {
  static actions;
  static rooms;
  static types_capteurs;
  static types_actionneurs;
  static logs;

  static async injectDocker(conn) {
    const collections = [
      { name: 'actions', file: 'actions.json' },
      { name: 'rooms', file: 'pieces.json' },
      { name: 'types_actionneurs', file: 'types_actionneurs.json' },
      { name: 'types_capteurs', file: 'types_capteurs.json' }
    ];

    try {
      if(!this.logs){
        await this.initLogsCollection(conn);
      }

      if (!this.actions) {
        this.actions = await this.initDatabase(conn, collections[0].name, collections[0].file);
        console.log(this.actions)
      }
      if (!this.rooms) {
        this.rooms = await this.initDatabase(conn, collections[1].name, collections[1].file);
      }
      if (!this.types_capteurs) {
        this.types_capteurs = await this.initDatabase(conn, collections[2].name, collections[2].file);
      }
      if (!this.types_actionneurs) {
        this.types_actionneurs = await this.initDatabase(conn, collections[3].name, collections[3].file);
      }
    } catch (e) {
      console.error("Unable to initialize the docker database:", e);
      throw e;
    }
  }

  static async initLogsCollection(conn) {
    try {
      const logsCollection = conn.db(process.env.MONGODB_DB).collection('logs');
      const exists = await logsCollection.countDocuments() > 0;
      if (!exists) {
        await conn.db(process.env.MONGODB_DB).createCollection('logs');
        this.logs = true;
        console.log("Collection 'logs' created");
      } else {
        this.logs= true;
      }
    } catch (e) {
      console.error("Error initializing 'logs' collection:", e);
      throw e;
    }
  }

  static async initDatabase(conn, name, file) {
    try {
      console.log("start")
      const collection = conn.db(process.env.MONGODB_DB).collection(name);
      console.log(process.env.MONGODB_DB)
      if (await collection.countDocuments() > 0) {
        console.log("ok")
        return collection;
      }

      const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'databases', file)));
      console.log(data);
      await conn.db(process.env.MONGODB_DB).createCollection(name);
      const result = await collection.insertMany(data);
      console.log("Insertion successfull !")
      return result;
    } catch (e) {
      console.error("Error initializing database:", e);
      throw e;
    }
  }
}

module.exports = InitMongo;