import  mongoose from 'mongoose';

class Database {
  constructor() {
    this.connectDB();
  }

  private async connectDB() {
    try {
      await mongoose.connect('mongodb+srv://heermistry2312:jwt123@cluster0.ub1wzmo.mongodb.net/Heer');
      console.log("Database Connected");
    } catch (err) {
      console.error("Failed to connect to the database:", err);
      process.exit(1);
    }
  }
}

export default Database;
