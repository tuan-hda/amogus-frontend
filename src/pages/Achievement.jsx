import React from "react";
import { Card, Text, Row } from "@nextui-org/react";
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

const achievements = [
  {
    title: "Chuyên gia môi trường",
    point: "500",
  },
  {
    title: "Bậc thầy môi trường",
    point: "1000",
  },
  {
    title: "Thạc sĩ môi trường",
    point: "2000",
  },
  {
    title: "Tiến sĩ môi trường",
    point: "4000",
  },
  {
    title: "Nhà khoa học môi trường",
    point: "6000",
  },
  {
    title: "Chúa tể môi trường",
    point: "10000",
  },
];

const point = 1853;

const Achievement = () => {
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

  return (
    <div>
      <div className="bg-white w-[600px] rounded-xl p-8 mx-auto flex-col">
        <h3 className="text-center mb-0 font-semibold">
          Điểm tích lũy
        </h3>
        <div className="w-[300px] aspect-square flex items-center p-4 mx-auto relative">
          <img src={laurelIcon} alt="Laurel" className="w-full" />
          <p className="text-center text-5xl absolute w-[268px] top-[100px]">
            {point}
          </p>
        </div>
      </div>
      <div className="bg-white w-[600px]  rounded-xl p-8 mx-auto mt-8">
        <div className="flex items-center">
          {/* <img src={trophyIcon} alt="Trophy" className="w-10 h-10" /> */}
          <h3 className="mb-0">Các chứng nhận đạt được</h3>
        </div>
        <div className="grid grid-flow-col auto-cols-[39%] overflow-x-auto mt-8 gap-x-4 pb-4">
          {achievements.map((a, i) => (
            <Card
              key={i}
              isHoverable
              variant="bordered"
              color=""
              css={{ aspectRatio: "1" }}
            >
              <Card.Body>
                <Card.Image src={getAchievementPicture(a.title)} width="50%" />
                <Text className="text-center ">{a.title}</Text>
                <Text className="text-center font-bold" color="#07bc0c">
                  {a.point + "đ"}
                </Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <div className="bg-white w-[600px]  rounded-xl p-8 mx-auto mt-8">
        <h4>Số tiền mà chúng tôi đã quyên góp được từ điểm của bạn</h4>
        <Row justify="center" css={{ mt: 30 }}>
          <img src={moneyIcon} alt="Money" className="w-10 h-10" />
          <p className="text-2xl ml-4">
            {(point * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              "đ"}
          </p>
        </Row>
      </div>
    </div>
  );
};

export default Achievement;
