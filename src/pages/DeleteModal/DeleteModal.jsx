import React from "react";
import "./DeleteModal.css";
import { IoMdWarning } from "react-icons/io";
import axios from "axios";
export default function DeleteModal({
  onOpenDeleteModal,
  deleteModalSendDataFromAdminState,
  getALlCamsDataFun,
  deleteTost,
}) {
  const submitDeleteRecord = async () => {
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
    await API.delete(`/cam-delete/${deleteModalSendDataFromAdminState}`, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        // onEditModalCrossClick();
        getALlCamsDataFun();
        onOpenDeleteModal();
        deleteTost();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="delete__main__card">
      <div className="delete__icons__card">
        <IoMdWarning color="#ff6f00" size={30} />
      </div>
      <h3>Delete Cam</h3>
      <span>Do you really want to delete these record . . ?</span>
      <div className="delete__modal__button__card">
        <button onClick={() => onOpenDeleteModal()}>Cancel</button>
        <button onClick={submitDeleteRecord}>Delete</button>
      </div>
    </div>
  );
}
