const https = require('https');

const getResponse = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let body = "";
    
          res.on("data", (chunk) => {
            body += chunk;
          });
    
          res.on("end", () => {
            try {
              const response = JSON.parse(body);
              resolve(response);
            } catch (error) {
              console.error(error.message);
              reject(error);
            }
          });
        }).on("error", (error) => {
          console.error(error.message);
          reject(error);
        });
    });
}

module.exports = getResponse
