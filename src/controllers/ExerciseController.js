const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Exercise = require('../models/Exercise');

const exercise_data = [
  { title: "Bench Press", description: "Supino plano com barra" },
  { title: "Squat", description: "Agachamento livre com barra" },
  { title: "Deadlift", description: "Peso morto convencional" },
  { title: "Pull-ups", description: "Elevações na barra fixa" },
  { title: "Overhead Press", description: "Press militar de ombros" },
  { title: "Barbell Row", description: "Remada com barra" },
  { title: "Lunges", description: "Afundos com halteres" },
  { title: "Plank", description: "Prancha abdominal isométrica" },
  { title: "Bicep Curls", description: "Flexão de braços com halteres" },
  { title: "Tricep Dips", description: "Fundos de tríceps" },
  { title: "Leg Press", description: "Prensa de pernas 45 graus" },
  { title: "Lateral Raises", description: "Elevações laterais para ombros" },
  { title: "Face Pulls", description: "Puxada para face com corda" },
  { title: "Leg Curls", description: "Flexão de pernas na máquina" },
  { title: "Calf Raises", description: "Elevação de gémeos em pé" },
  { title: "Push-ups", description: "Flexões de braços no solo" },
  { title: "Box Jumps", description: "Salto para a caixa" },
  { title: "Kettlebell Swing", description: "Balanço com kettlebell" },
  { title: "Burpees", description: "Salto com flexão rítmica" },
  { title: "Romanian Deadlift", description: "Peso morto romeno" },
  { title: "Lat Pulldown", description: "Puxada vertical na polia" },
  { title: "Incline DB Press", description: "Supino inclinado com halteres" },
  { title: "Hammer Curls", description: "Flexão martelo" },
  { title: "Skull Crushers", description: "Tríceps testa com barra EZ" },
  { title: "Russian Twists", description: "Rotação de tronco para abs" },
  { title: "Bulgarian Split Squat", description: "Agachamento búlgaro unilateral" },
  { title: "Chin-ups", description: "Elevações com pega supinada" },
  { title: "Mountain Climbers", description: "Movimento de escalador no solo" },
  { title: "Wall Sit", description: "Cadeira isométrica na parede" },
  { title: "Hip Thrust", description: "Elevação pélvica com carga" }
];

sequelize.sync({ force: true }).then(() => {
    
    Exercise.bulkCreate(exercise_data, { validate: true }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});