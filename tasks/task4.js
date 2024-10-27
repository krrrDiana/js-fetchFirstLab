"Ваш код повинен зробити DELETE-запит до вказаного URL, де {userId} – це ID користувача, якого потрібно видалити."
"Поверніть статус відповіді сервера після видалення."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"
const https = require('https');

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: `/users/${id}`, 
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 
      },
    };

    const req = https.request(options, (res) => {
      const { statusCode } = res; 
      res.on('data', () => {
      });

      res.on('end', () => {
        if (statusCode >= 200 && statusCode < 300) {
          resolve({
            message: `Користувач з ID ${id} успішно видалений`, // Додано зворотні кавички
            status: statusCode,
          });
        } else {
          reject({
            message: `Не вдалося видалити користувача з ID ${id}`, // Додано зворотні кавички
            status: statusCode,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({ message: 'Помилка HTTP-запиту', error: error.message });
    });

    req.end();
  });
}

console.log(deleteUser(1));

module.exports = deleteUser;
