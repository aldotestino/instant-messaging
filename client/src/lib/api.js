const base_url = 'https://server-instant-messaging.herokuapp.com';

async function api({ endpoint, method, values, token }) {
  const data = cleanData(values);
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
    options.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(`${base_url}/api/v1/${endpoint}`, options);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

function cleanData(values) {
  return Object.keys(values).reduce((cleanData, key) => {
    cleanData[key] = values[key].trim();
    return cleanData;
  }, {});
}

export {
  api,
}