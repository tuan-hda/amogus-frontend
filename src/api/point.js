import base from "./base";

export const getPoint = (token) => {
  return new Promise((resolve, reject) => {
    base
      .get("/user/rank", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
