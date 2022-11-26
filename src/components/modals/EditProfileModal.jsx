import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  useInput,
  Loading,
} from "@nextui-org/react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TbCameraPlus } from "react-icons/tb";
import { editProfile } from "../../api/user";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const EditProfileModal = ({ visible, closeHandler, name, ava }) => {
  // Store upload image of user temporarily
  const [image, setImage] = useState();
  const [detail, setDetail] = useState({
    name: "",
    ava: "",
  });
  const [loading, setLoading] = useState(false);
  const { value, bindings } = useInput("");

  // Handle when user update photo
  const handlePhotoChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDetail({
          ...detail,
          ava: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(reader.result);
  };

  const handleUploadImage = () => {
    const storageRef = ref(
      storage,
      `avatar/${image.lastModified + image.name}`
    );

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(storageRef).then((url) => updateProfile(url));
      })
      .then((err) => console.log(err));
  };

  const updateProfile = async (photoUrl) => {
    if (photoUrl === "") {
      if (ava) photoUrl = ava;
      else photoUrl=""
    }
    let nameField = value;
    if (nameField==='') {
      if (name) nameField=name;
    }
    try {
      onAuthStateChanged(auth, (userCredential) => {
        if (userCredential) {
          auth.currentUser.getIdToken().then((token) => {
            editProfile(token, nameField, photoUrl)
              .then((result) => {
                // setUser({
                //   ...auth.currentUser,
                //   ...result.data[0],
                // });
              })
              .catch((error) => console.log(error))
              .finally(() => {
                closeHandler();
                setLoading(false);
                window.location.reload();
              });
          });
        } else {
          console.log("Not signed in");
          setLoading(false);
        }
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.headers);
        console.log(err.response.status);
      } else {
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    updateProfile(detail.ava);
  };

  return (
    <Modal
      width="600px"
      height="600px"
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Modal.Header>
            <Text id="modal-title" b size={18}>
              Chỉnh sửa hồ sơ
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div
              className={`relative flex justify-center items-center w-[160px] mx-auto`}
            >
              <img
                src={
                  detail.ava
                    ? detail.ava
                    : ava
                    ? ava
                    : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
                }
                alt="Avatar"
                className={`rounded-full aspect-square object-cover mx-auto`}
              />
              <>
                <label
                  htmlFor="photo"
                  className="absolute bg-black opacity-50 hover:bg-black hover:opacity-20 cursor-pointer w-[50px] h-[50px] rounded-full flex justify-center items-center "
                >
                  <input
                    hidden
                    type="file"
                    onChange={handlePhotoChange}
                    id="photo"
                    accept="image/*"
                  />
                  <TbCameraPlus width={30} color="#ffffff" />
                </label>
              </>
            </div>
            <Input
              {...bindings}
              value={name ? name : detail.name}
              label="Tên"
              clearable
              bordered
              fullWidth
              color="success"
              size="lg"
              placeholder="Tên"
              css={{ $: "Black" }}
              //   contentLeft={<Mail fill="currentColor" />}
            />
            {/* <Textarea
            label="Tiểu sử"
            clearable
            bordered
            fullWidth
            color="success"
            size="lg"
            maxLength={160}
            placeholder="Tiểu sử"
            css={{ $: "Black" }}
            //   contentLeft={<Password fill="currentColor" />}
          />
          <Input
            label="Vị trí"
            clearable
            bordered
            fullWidth
            color="success"
            size="lg"
            placeholder="Vị trí"
            css={{ $: "Black" }}
            //   contentLeft={<Mail fill="currentColor" />}
          /> */}
            {/* <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row> */}
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Hủy
            </Button>
            <Button
              auto
              onClick={() => handleSubmit()}
              css={{ background: "#108944" }}
            >
              Lưu
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

export default EditProfileModal;
