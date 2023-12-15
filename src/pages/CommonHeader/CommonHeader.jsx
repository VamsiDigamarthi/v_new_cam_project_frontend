import React from "react";
import "./CommonHeader.css";
import { BiBell } from "react-icons/bi";
import { useSelector } from "react-redux";
export const CommonHeader = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  return (
    <div className="common__header__main">
      <h2>Dashboard</h2>
      <div>
        <BiBell />
        <span>{UUU[0]?.username}</span>
        <img
          src="https://imagedelivery.net/5MYSbk45M80qAwecrlKzdQ/c837a210-243a-4db5-8c0f-9cc4995ce700/preview"
          alt=""
        />
      </div>
    </div>
  );
};
