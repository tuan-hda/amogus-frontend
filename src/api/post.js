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

export const getAdminPost = () => {
  return new Promise((resolve, reject) => {
    base
      .get("/post/admin")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const verifyPost = (token, id, verify) => {
  return new Promise((resolve, reject) => {
    base
      .put(
        "/post/verify",
        { verify },
        {
          params: {
            id,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const joinActivity = (token, id) => {
  return new Promise((resolve, reject) => {
    base
      .post(
        "/activity/join",
        {},
        {
          headers: {
            params: {
              id,
            },
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getCommentById = (portId) => {
  return new Promise((resolve, reject) => {
    base
      .get("/comment", {
        params: {
          portId,
        },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const postComment = (postId, content, userId) => {
  return new Promise((resolve, reject) => {
    base
      .post("/comment", { postId, content, userId })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getActivity = (postId) => {
  return new Promise((resolve, reject) => {
    base
      .get("/activity", { params: { postId } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const checkIn = (token, id, userId) => {
  return new Promise((resolve, reject) => {
    base
      .post(
        "/activity/join",
        { userId },
        {
          headers: {
            params: {
              id,
            },
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const doLike = (token) => {
  return new Promise((resolve, reject) => {
    base
      .post(
        "/like",
        {},
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

export const doShare = (postId, userId) => {
  return new Promise((resolve, reject) => {
    base
      .post("/share", { postId, userId })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
