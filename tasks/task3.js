"Ваш код повинен зробити PATCH-запит до вказаного URL, де {userId} – це ID існуючого користувача."
"Для оновлення користувача передайте в запит нові дані, наприклад, нове ім’я."
"Поверніть відповідь від сервера з оновленими даними користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"
const https = require('https');

function updateUser(id, updatedData) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: `/users/${id}`,  
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject('Помилка при обробці JSON');
        }
      });
    });

    req.on('error', (error) => {
      reject('Помилка HTTP-запиту: ' + error.message);
    });

    req.write(JSON.stringify(updatedData));
    req.end();
  });
}

console.log(updateUser(1, { name: 'New Name' }));

module.exports = updateUser;
