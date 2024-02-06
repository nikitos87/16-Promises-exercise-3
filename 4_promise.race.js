// Задание #3

const PHOTO_URL = "https://jsonplaceholder.typicode.com/photos/";

const setLoader = () => {
  const loader = document.querySelector("#loader");
  if (loader.hasAttribute("hidden")) {
    loader.removeAttribute("hidden");
  } else {
    loader.setAttribute("hidden", "");
  }
};

function drawHtml(img, title) {
  const dataContainer = document.querySelector("#data-container");
  const photoElement = document.createElement("li");
  photoElement.classList.add("photo-item");
  const image = document.createElement("img");
  image.classList.add("photo-item__image");
  image.setAttribute("src", img);
  const imageTitle = document.createElement("h3");
  imageTitle.classList.add("photo-item__title");
  imageTitle.textContent = title;
  photoElement.append(image);
  photoElement.append(imageTitle);
  dataContainer.append(photoElement);
}

const getFastestLoadedPhoto = (ids) => {
  setLoader();
  const photos = ids.map((id) => fetch(`${PHOTO_URL}/${id}`));
  Promise.race(photos)
    .then((resp) => {
      //   console.log(resp);
      const loadedPhotoData = resp.json();
      return loadedPhotoData;
    })
    .then((photo) => {
      //   console.log(photo);
      const { title, url } = photo;
      //   console.log(title);
      //   console.log(url);
      drawHtml(url, title);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader();
    });
};

getFastestLoadedPhoto([60, 12, 55]);
