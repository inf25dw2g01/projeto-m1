const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');

const user_data = [
  { firstName: "John", lastName: "Baker", email: "aksjhad@teste.pt", password: "hashed_password_1" },
  { firstName: "Max", lastName: "Butler", email: "aksjhad@teste.pt", password: "hashed_password_2" },
  { firstName: "Ryan", lastName: "Fisher", email: "aksjhad@teste.pt", password: "hashed_password_3" },
  { firstName: "Robert", lastName: "Gray", email: "aksjhad@teste.pt", password: "hashed_password_4" },
  { firstName: "Sam", lastName: "Lewis", email: "aksjhad@teste.pt", password: "hashed_password_5" },
  { firstName: "Alice", lastName: "Smith", email: "alice.s@teste.pt", password: "hashed_password_6" },
  { firstName: "David", lastName: "Miller", email: "d.miller@teste.pt", password: "hashed_password_7" },
  { firstName: "Emma", lastName: "Wilson", email: "emma.w@teste.pt", password: "hashed_password_8" },
  { firstName: "Lucas", lastName: "Brown", email: "l.brown@teste.pt", password: "hashed_password_9" },
  { firstName: "Sophia", lastName: "Davis", email: "sophia.d@teste.pt", password: "hashed_password_10" },
  { firstName: "James", lastName: "Garcia", email: "j.garcia@teste.pt", password: "hashed_password_11" },
  { firstName: "Olivia", lastName: "Martinez", email: "o.martinez@teste.pt", password: "hashed_password_12" },
  { firstName: "Daniel", lastName: "Hernandez", email: "d.hernandez@teste.pt", password: "hashed_password_13" },
  { firstName: "Isabella", lastName: "Lopez", email: "i.lopez@teste.pt", password: "hashed_password_14" },
  { firstName: "Matthew", lastName: "Gonzalez", email: "m.gonzalez@teste.pt", password: "hashed_password_15" },
  { firstName: "Mia", lastName: "Wilson", email: "m.wilson@teste.pt", password: "hashed_password_16" },
  { firstName: "Ethan", lastName: "Anderson", email: "e.anderson@teste.pt", password: "hashed_password_17" },
  { firstName: "Charlotte", lastName: "Thomas", email: "c.thomas@teste.pt", password: "hashed_password_18" },
  { firstName: "Alexander", lastName: "Taylor", email: "a.taylor@teste.pt", password: "hashed_password_19" },
  { firstName: "Amelia", lastName: "Moore", email: "a.moore@teste.pt", password: "hashed_password_20" },
  { firstName: "Michael", lastName: "Jackson", email: "m.jackson@teste.pt", password: "hashed_password_21" },
  { firstName: "Emily", lastName: "White", email: "e.white@teste.pt", password: "hashed_password_22" },
  { firstName: "Benjamin", lastName: "Harris", email: "b.harris@teste.pt", password: "hashed_password_23" },
  { firstName: "Harper", lastName: "Martin", email: "h.martin@teste.pt", password: "hashed_password_24" },
  { firstName: "William", lastName: "Thompson", email: "w.thompson@teste.pt", password: "hashed_password_25" },
  { firstName: "Evelyn", lastName: "Garcia", email: "e.garcia2@teste.pt", password: "hashed_password_26" },
  { firstName: "Sebastian", lastName: "Martinez", email: "s.martinez2@teste.pt", password: "hashed_password_27" },
  { firstName: "Abigail", lastName: "Robinson", email: "a.robinson@teste.pt", password: "hashed_password_28" },
  { firstName: "Jack", lastName: "Clark", email: "j.clark@teste.pt", password: "hashed_password_29" },
  { firstName: "Luna", lastName: "Rodriguez", email: "l.rodriguez@teste.pt", password: "hashed_password_30" }
];

sequelize.sync({ force: true }).then(() => {

    User.bulkCreate(user_data, { validate: true }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});