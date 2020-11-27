const base_url = 'http://server-instant-messaging.herokuapp.com';

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
    const response = await fetch(`${base_url}/api/v1/${endpoint}`, options);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export {
  api,
}