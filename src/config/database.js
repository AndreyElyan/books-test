module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'books',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
