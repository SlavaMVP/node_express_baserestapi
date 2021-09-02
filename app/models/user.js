const db = require("../config/db");

module.exports = class User {
  date = new Date();
  constructor({ name, surname, email, password, country, city, address }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.country = country;
    this.city = city;
    this.address = address;
  }

  save() {
    return db.execute(
      `
    INSERT INTO clients (client_id, name, surname, email, country, city, address, password, registration_date)
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        this.name,
        this.surname,
        this.email,
        this.country,
        this.city,
        this.address,
        this.password,
        this.date,
      ]
    );
  }

  static getUser(email) {
    return db.query(`SELECT * FROM clients where email = '${email}'`);
  }
};
