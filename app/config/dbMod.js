module.exports = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "hmsdb",
  },
  migrations: {
    directory: "../migrations",
  },
};
