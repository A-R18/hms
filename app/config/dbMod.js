module.exports = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgresdb18",
    port: 5432,
    database: "hmsdb",
  },
  migrations: {
    directory: "../migrations",
  },
};
