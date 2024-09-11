
const { faker } = require('@faker-js/faker');
const User = require('./src/models/User');
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function createRandomUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    isVerified: true
  };
}

 const users = faker.helpers.multiple(createRandomUser, {
  count: 10,
});

async function seedDatabase() {
    try {
      await User.insertMany(users);
      console.log('Моковые данные успешно добавлены');
    } catch (err) {
      console.error('Ошибка при добавлении данных:', err);
    } finally {
      mongoose.connection.close(); // Закрываем соединение после завершения
    }
  }
  
  seedDatabase(); 