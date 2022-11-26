import base from "./base";

const createUser = (token, email, name) => {
  return new Promise((resolve, reject) => {
    base
      .post(
        "/user/create",
        {
          email,
          name,
        },
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

export const getProfile = (token) => {
  return new Promise((resolve, reject) => {
    base
      .get(
        "/user/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export default createUser;
