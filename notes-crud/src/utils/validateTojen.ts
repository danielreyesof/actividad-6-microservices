import fetch, { Request } from 'cross-fetch';

const makeCall = (token: string) => {
  if (token === null) throw new Error('No token provided');

  return new Promise((resolve, reject) => {
    const options = new Request('https://act6auth.up.railway.app/api/auth/verifytoken', {
      method: 'GET',
      headers: { Authorization: token },
    });

    fetch(options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
export default makeCall;
