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
