const generateBase64Image = (fileImage) => {
  let fileReader = new FileReader();
  let promise = new Promise((resolve, reject) => {
    fileReader.onload = (e) =>
      resolve({
        src: e.target.result,
        name: fileImage.name,
        mimetype: fileImage.type,
      });
    fileReader.onerror = (err) => reject(err);
  });
  fileReader.readAsDataURL(fileImage);
  return promise;
};

export default generateBase64Image;
