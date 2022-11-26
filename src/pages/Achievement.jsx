import React, { useEffect, useContext, useState } from "react";
import { Card, Text, Row, Loading } from "@nextui-org/react";
import moneyIcon from "../assets/money.png";
import laurelIcon from "../assets/laurel.png";
import {
  chuyenGiaIcon,
  bacThayIcon,
  chuaTeIcon,
  khoaHocIcon,
  thacSiIcon,
  tienSiIcon,
} from "../assets/achievements";
import { getUserAchievement } from "../api/user";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Achievement = () => {
  const [achievement, setAchievement] = useState({
    achievement: [],
    point: 0,
    money: 0
  }); 
  const [loading, setLoading] = useState(true);

  const getAchievementPicture = (title) => {
    switch (title) {
      case "Chuyên gia môi trường":
        return chuyenGiaIcon;
      case "Bậc thầy môi trường":
        return bacThayIcon;
      case "Thạc sĩ môi trường":
        return thacSiIcon;
      case "Tiến sĩ môi trường":
        return tienSiIcon;
      case "Nhà khoa học môi trường":
        return khoaHocIcon;
      case "Chúa tể môi trường":
        return chuaTeIcon;
      default:
        return chuyenGiaIcon;
    }
  };

  const getAchievementPoint = (achievement) => {
    switch (achievement) {
      case "Chuyên gia môi trường":
        return 500;
      case "Bậc thầy môi trường":
        return 1000;
      case "Thạc sĩ môi trường":
        return 2000;
      case "Tiến sĩ môi trường":
        return 4000;
      case "Nhà khoa học môi trường":
        return 6000;
      case "Chúa tể môi trường":
        return 10000;
      default:
        return 0;
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        auth.currentUser.getIdToken().then((token) => {
          getUserAchievement(token)
            .then((result) => {
              console.log(result)
              setAchievement({
                achievement: result.data.achievement,
                point: result.data.point,
                money: result.data.money
              });
            })
            .catch((error) => console.log(error))
            .finally(() => {
              setLoading(false);
            });
        });
      } else {
        console.log("Not signed in");
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="mt-52">
          <center >
            <Loading color={"success"} />
          </center>
        </div>
      ) : (
        <>
          <div className="bg-white w-[600px] rounded-xl p-8 mx-auto flex-col">
            <h3 className="text-center mb-0 font-semibold">Điểm tích lũy</h3>
            <div className="w-[350px] aspect-square flex items-center p-4 mx-auto relative">
              <img src={laurelIcon} alt="Laurel" className="w-full" />
              <p className="text-center text-5xl absolute w-[318px] top-[120px]">
                {achievement.point}
              </p>
            </div>
          </div>
          <div className="bg-white w-[600px]  rounded-xl p-8 mx-auto mt-8">
            <div className="flex items-center">
              {/* <img src={trophyIcon} alt="Trophy" className="w-10 h-10" /> */}
              <h3 className="mb-0">Các chứng nhận đạt được</h3>
            </div>
            <div className="grid grid-flow-col auto-cols-[39%] overflow-x-auto mt-8 gap-x-4 pb-4">
              {achievement.achievement.map((a, i) => (
                <Card
                  key={i}
                  isHoverable
                  variant="bordered"
                  color=""
                  css={{ aspectRatio: "1" }}
                >
                  <Card.Body>
                    <Card.Image
                      src={getAchievementPicture(a)}
                      width="50%"
                    />
                    <Text className="text-center ">{a}</Text>
                    <Text className="text-center font-bold" color="#07bc0c">
                      {getAchievementPoint(a) + "đ"}
                    </Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
          <div className="bg-white w-[600px]  rounded-xl p-8 mx-auto mt-8">
            <h4>
              Số tiền mà chúng tôi đã quyên góp được từ{" "}
              <span className="text-[#13A452]">điểm</span> của bạn
            </h4>
            <Row justify="center" css={{ mt: 30 }}>
              <img src={moneyIcon} alt="Money" className="w-10 h-10" />
              <p className="text-2xl ml-4">
                {achievement.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  "đ"}
              </p>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default Achievement;
