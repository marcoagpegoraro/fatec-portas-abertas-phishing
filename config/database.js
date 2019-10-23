module.exports = {
  username: process.env.DATABASE_URL,
  password: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_DATABASE,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  dialectOptions: {
    ssl: true
  }
}