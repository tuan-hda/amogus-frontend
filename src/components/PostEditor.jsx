import { User, Input, Dropdown } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IoMdClose } from "react-icons/io";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PostEditorButtons from "./PostEditorButtons";
import { auth, storage } from "../firebase";
import classNames from "classnames";
import { createPost } from "../api/post";
import compareDates from "../utils/compareDate";
import { toast } from "react-toastify";
import UserContext from "../utils/UserProvider";

const PostEditor = ({ role }) => {
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [value, setValue] = useState();
  const [type, setType] = useState("post");
  const [points, setPoints] = useState(0);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const { user } = useContext(UserContext);

  const handleUploadImage = (e) => {
    const img = e.target.files[0];
    setImage(img);
    const objUrl = URL.createObjectURL(img);
    setUrl(objUrl);
  };

  const doCreatePost = (url) => {
    auth.currentUser.getIdToken().then((token) => {
      createPost(token, value, "", type === "activity", "", url ?? "", dateStart, dateEnd, points)
        .then(() => {
          console.log("Create post successfully");
          toast.success("Đăng bài thành công!");
        })
        .catch((error) => console.log(error));
    });
  };

  const handleSubmit = () => {
    if (type === "activity") {
      if (!dateStart || !dateEnd) {
        toast.error("Cần chọn ngày bắt đầu và kết thúc");
        return;
      }

      if (!compareDates(dateStart, dateEnd)) {
        toast.error("Ngày bắt đầu phải bé hơn hoặc bằng ngày kết thúc");
        return;
      }
    }

    if (image || value) {
      if (!image) {
        doCreatePost();
        return;
      }

      const storageRef = ref(storage, `images/${image.lastModified + image.name}`);

      uploadBytes(storageRef, image)
        .then(() => {
          getDownloadURL(storageRef).then((url) => doCreatePost(url));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 pl-1 pr-4 bg-white'>
      {/* Content */}
      <div className='px-2 pt-2 flex items-start'>
        <User src={user?.photoURL}></User>
        <div className='flex-1 justify-center -ml-2 '>
          <TextareaAutosize
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Viết gì đó...'
            className='resize-none font-light w-full bg-[#E7E7E7] px-4 py-2 rounded-xl mr-3'
          />

          {url && (
            <div className='relative'>
              <div
                className='rounded-full p-2 bg-gray-200 top-2 right-2 absolute cursor-pointer hover:bg-opacity-80'
                onClick={() => {
                  setImage(undefined);
                  setUrl(undefined);
                }}
              >
                <IoMdClose />
              </div>

              <img className='rounded-xl mt-2 max-h-[400px] w-full object-cover' src={url} alt='Post content'></img>
            </div>
          )}
        </div>
      </div>

      {role === "ADMIN" && (
        <div className='text-xs px-3 mt-4 flex items-center justify-end gap-2'>
          Loại:{" "}
          <Dropdown>
            <Dropdown.Trigger
              css={{
                minWidth: 0,
                width: "100px",
              }}
            >
              <Input
                aria-label='point'
                placeholder='Điểm'
                className='cursor-pointer'
                color='black'
                css={{
                  minWidth: 0,
                  width: "100px",
                }}
                value={type === "post" ? "Bài đăng" : "Hoạt động"}
                size='sm'
                readOnly
              />
            </Dropdown.Trigger>
            <Dropdown.Menu aria-label='Static Actions'>
              <Dropdown.Item key='post' onClick={() => setType("post")}>
                <p
                  onClick={() => setType("post")}
                  className={classNames(type === "post" && "text-blue-500", "min-w-full")}
                >
                  Bài đăng
                </p>
              </Dropdown.Item>
              <Dropdown.Item key='activity'>
                <p
                  onClick={() => setType("activity")}
                  className={classNames(type === "activity" && "text-blue-500", "min-w-full")}
                >
                  Hoạt động
                </p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

      {/* Post buttons */}
      <div className='h-4'></div>
      <PostEditorButtons
        type={type}
        points={points}
        onPoints={(e) => setPoints(e.target.value)}
        dateStart={dateStart}
        dateEnd={dateEnd}
        onDateEnd={(e) => setDateEnd(e.target.value)}
        onDateStart={(e) => setDateStart(e.target.value)}
        handleSubmit={handleSubmit}
        setImage={handleUploadImage}
      />
    </div>
  );
};

export default PostEditor;
