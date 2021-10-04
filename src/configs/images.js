import _ from "lodash";

export const imageSize = (url, images, file_size, file_path) => {
  let size = !_.isEmpty(images) ? images[images.indexOf(file_size)] : "";
  return `${url}${size}${file_path}`;
};
