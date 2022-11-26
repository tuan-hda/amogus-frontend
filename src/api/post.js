import base from "./base";

export const getPost = () => {
  return new Promise((resolve, reject) => {
    base
      .get("/post")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const createPost = (token, content, title, isActivity, tags, imageURL, dateStart, dateEnd, point = 0) => {
  return new Promise((resolve, reject) => {
    base
      .post(
        "/post/create",
        { token, content, title, isActivity, tags, imageURL, dateStart, dateEnd, point },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
