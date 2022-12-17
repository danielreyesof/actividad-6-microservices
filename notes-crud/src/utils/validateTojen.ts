import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/verifytoken',
  method: 'POST',
  headers: {},
};

const makeCall = (token: string) => {
  if (token === null) throw new Error('No token provided');

  options.headers = { Authorization: token };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (d) => {
        resolve(JSON.parse(d));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};
export default makeCall;
