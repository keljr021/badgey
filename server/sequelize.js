import Sequelize from 'sequelize';

const { DB_NAME, DB_USER, DB_PASS } = process.env;

// Option 1: Passing parameters separately (recommended)
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql', // For older versions, just use 'mysql' string
  logging: console.log, // Set to true to see SQL queries in console
});

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully with MySQL.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectDB();
