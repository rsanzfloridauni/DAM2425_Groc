export const getDailyImage = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch (error) {
    return console.log(error);
  }
};

//TOKEN ACREDITATION
export const getDataWithToken = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: { Authorization: token },
    });

    if (response) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

//PUT
export const putData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse.data);
    }
  } catch (error) {
    console.log(error);
  }
};

//POST
export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      getDataWithToken('http://localhost:8080/imgini', jsonResponse.result);
    }
  } catch (error) {
    console.log(error);
  }
};
