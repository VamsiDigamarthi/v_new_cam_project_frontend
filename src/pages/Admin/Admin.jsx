import React, { useEffect, useState } from "react";
import "./Admin.css";

import { Header } from "../Header/Header";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { GoDotFill } from "react-icons/go";
import { FaDownload } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

const Admin = ({ apiAllCamsDataFromAppCom }) => {
  const [mainCamAdminDataFromApp, setMainCamAdminDataFromApp] = useState([
    apiAllCamsDataFromAppCom,
  ]);

  const [secondMainFromMainCam, setSecondMainFromMainCam] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 2;

  const currentItems = secondMainFromMainCam?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(secondMainFromMainCam?.length / 2);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 2) % secondMainFromMainCam?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setSecondMainFromMainCam(mainCamAdminDataFromApp);
  }, [mainCamAdminDataFromApp]);

  useEffect(() => {
    setMainCamAdminDataFromApp(apiAllCamsDataFromAppCom);
  }, [apiAllCamsDataFromAppCom]);

  // console.log(currentItems);

  const onSearchBasedOnPcNo = (e) => {
    const value = mainCamAdminDataFromApp.filter((each) =>
      e.target.value === "" ? each : each.PS_No.includes(e.target.value)
    );
    setSecondMainFromMainCam(value);
  };

  return (
    <div className="admin__main__card">
      <Header apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom} />
      <h2>Welcome . . . . . ?</h2>
      {/* filter table ui */}
      <div className="table__filter__ui">
        <div>
          <input
            type="text"
            placeholder="Pc or Ac number"
            onChange={onSearchBasedOnPcNo}
          />
          <button>Submit</button>
        </div>
        <div className="filter__sort__main__card">
          <select>
            <option>Filted By</option>
            {/* <option>hja</option>
            <option>hja</option>
            <option>hja</option> */}
          </select>
          <select>
            <option>Sort By</option>
            {/* <option>hja</option>
            <option>hja</option>
            <option>hja</option> */}
          </select>
          <FaDownload />
        </div>
      </div>
      {/* table views */}
      <div className="table__main__card">
        <div className="table__header__card">
          <span>State</span>
          <span>District Name</span>
          <span>PS No</span>
          <span>AC No</span>
          <span>Camera ID</span>
          <span>Status</span>
          <span className="table__header__last__span">Action</span>
        </div>
        <div className="table__body__card">
          {currentItems.map((each, key) => (
            <div key={key}>
              <span>{each.State}</span>
              <span>{each.District_Name}</span>
              <span>{each.PS_No}</span>
              <span>{each.AC_No}</span>
              <span>{each.Camera_ID}</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  //   justifyContent: "center",
                }}
              >
                {" "}
                <div
                  style={{
                    color: each.Status === "online" ? "#ff6f00" : "greenyellow",
                    marginTop: "10px",
                    marginRight: "5px",
                  }}
                >
                  <GoDotFill />
                </div>
                {each.Status}
              </span>
              <span className="table__header__last__span new__add__icons__style">
                <MdEdit size={20} />
                <MdDelete size={20} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="paginat"
      />
    </div>
  );
};

export default Admin;
