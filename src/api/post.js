import base from "./base";

export const getPost = () => {
  return new Promise((resolve, reject) => {
    base
      .post("/post")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
