import { SERVER_URL } from './config';

async function api({ endpoint, method, values, token }) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if (token) {
    options.headers.token = token;
  }
  if (values) {
    options.body = JSON.stringify(values);
  }
  try {
    const response = await fetch(`${SERVER_URL}/api/v1/${endpoint}`, options);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export {
  api,
}