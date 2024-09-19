
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
    firstName: 'test2',
    lastName: 'test2',
    email: 'test2@mail.ru',
    password: 'testtest',
    avatar: 'https://res.cloudinary.com/dmpka1qpz/image/upload/v1726754728/b75b29441bbd967deda4365441497221_ks3qer.jpg',
    isVerified: true
  };
}

//  const users = faker.helpers.multiple(createRandomUser, {
//   count: 10,
// });

async function seedDatabase() {
    try {
      const user = new User(createRandomUser())
      await user.save
      console.log('Моковые данные успешно добавлены');
    } catch (err) {
      console.error('Ошибка при добавлении данных:', err);
    } finally {
      mongoose.connection.close(); // Закрываем соединение после завершения
    }
  }
  
  seedDatabase(); 