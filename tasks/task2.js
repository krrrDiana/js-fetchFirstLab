"Ваш код повинен зробити POST-запит до вказаного URL."
"Для створення нового користувача, передайте в запит наступні дані:"
"name: ваше ім’я"
"email: ваш email"
"Поверніть відповідь від сервера після створення користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');
function createUser(user) {
  // Ваш код
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: '/users',
      method: 'POST',
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

    req.write(JSON.stringify(user));
    req.end();
  });
}

console.log(createUser({name: "Sam", email: "fjsnfkjns2342@gmail.com"}))

module.exports = createUser;
