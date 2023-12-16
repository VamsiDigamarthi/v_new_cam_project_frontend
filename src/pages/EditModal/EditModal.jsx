import React, { useEffect, useState } from "react";
import "./EditModal.css";
import axios from "axios";
// import { FaHome } from "react-icons/fa";
const EditModal = ({
  editModalSendDataFromAdminState,
  onEditModalCrossClick,
  getALlCamsDataFun,
  editTost,
}) => {
  const [modalData, setModalData] = useState(null);

  const usernameChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setModalData(editModalSendDataFromAdminState);
  }, [editModalSendDataFromAdminState]);

  //   console.log(modalData);

  const onSubmitEditDataFromServer = async (e) => {
    e.preventDefault();
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");

    headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

    // console.log(modalData?.id);

    const API = axios.create({
      baseURL: "http://localhost:8081",
    });
    await API.put(`/updat-all-details/${modalData?.id}`, modalData, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        onEditModalCrossClick();
        getALlCamsDataFun();
        editTost();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form
      className="edit__form__main__card"
      onSubmit={onSubmitEditDataFromServer}
    >
      <div
        className="inputBox"
        style={{
          width: "93%",
        }}
      >
        <input
          type="text"
          onChange={usernameChange}
          name="State"
          value={modalData?.State}
          required="required"
        />
        <span>State</span>
      </div>
      <div
        className="inputBox"
        style={{
          width: "93%",
        }}
      >
        <input
          type="text"
          onChange={usernameChange}
          name="District_Name"
          value={modalData?.District_Name}
          required="required"
        />
        <span> District</span>
      </div>

      <div className="form__pc__ac__card">
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="PS_No"
            value={modalData?.PS_No}
            required="required"
          />
          <span>PC NUMBER</span>
        </div>
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="AC_No"
            value={modalData?.AC_No}
            required="required"
          />
          <span>AC Number</span>
        </div>
      </div>
      <div
        className="inputBox"
        style={{
          width: "93%",
        }}
      >
        <input
          type="text"
          onChange={usernameChange}
          name="Camera_ID"
          value={modalData?.Camera_ID}
          required="required"
        />
        <span>Camera ID</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EditModal;
