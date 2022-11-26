import React, { useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Textarea,
} from "@nextui-org/react";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { TbCameraPlus } from "react-icons/tb";

const EditProfileModal = ({ visible, closeHandler }) => {
  // Store upload image of user temporarily
  const [image, setImage] = useState();
  const [detail, setDetail] = useState({
    name: "",
    about: "",
    address: "",
    ava: "",
  });

  // Handle when user update photo
  const handlePhotoChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDetail({
          ...detail,
          photo: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(reader.result)
  };

  const handleUploadImage = () => {
    // Generate a random id to make sure images' name are not duplicate
    const imageName = v4();
    // Get extension of image (jpg/png)
    const imageExt = image.name.split(".").pop();
    const name = imageName + "." + imageExt;
    const task = storage.ref(`images/${name}`).put(image);
    task.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(name)
          .getDownloadURL()
          .then((url) => {
            setDetail((previousState) => ({
              ...previousState,
              photo: url,
            }));
            updateProfile(url);
          });
      }
    );
  };

  const updateProfile = async (photoUrl) => {
    try {
      //   const token = await currentUser.getIdToken()
      //   await currentUser.updateProfile({
      //     displayName: detail.name
      //   })
      //   await api.put(
      //     routes.EDIT_PROFILE,
      //     routes.getEditProfileBody(
      //       1,
      //       detail.name,
      //       detail.dob,
      //       detail.phone,
      //       detail.gender,
      //       photoUrl,
      //       detail.address,
      //       detail.province,
      //       detail.district,
      //       detail.ward
      //     ),
      //     routes.getAccessTokenHeader(token)
      //   )
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.headers);
        console.log(err.response.status);
      } else {
        console.log(err.message);
      }
    } finally {
      //   setLoadsing(false)
    }
  };

  const handleSubmit = e => {
    // setLoading(true)
    e.preventDefault()
    if (image) handleUploadImage()
    else updateProfile(detail.photo)
  }


  return (
    <Modal
      width="600px"
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
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
              detail.photo
                ? detail.photo
                : "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/9/24/tumblr0a490ad7062f51c33ec0c054255256a2a1922eb2540-1664001587930930202526.jpg"
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
          label="Tên"
          clearable
          bordered
          fullWidth
          color="success"
          size="lg"
          placeholder="Tên"
          css={{ $$inputLabelColor: "Black" }}
          //   contentLeft={<Mail fill="currentColor" />}
        />
        <Textarea
          label="Tiểu sử"
          clearable
          bordered
          fullWidth
          color="success"
          size="lg"
          maxLength={160}
          placeholder="Tiểu sử"
          css={{ $$inputLabelColor: "Black" }}
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
          css={{ $$inputLabelColor: "Black" }}
          //   contentLeft={<Mail fill="currentColor" />}
        />
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
        <Button auto onClick={()=>updateProfile()} css={{ background: "#108944" }}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
