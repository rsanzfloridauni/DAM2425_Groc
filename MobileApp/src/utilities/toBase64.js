export default convertImageToBase64 = async (imageUri) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64(base64String);
    } catch (error) {
      console.error('Error convirtiendo imagen a Base64:', error);
    }
  };