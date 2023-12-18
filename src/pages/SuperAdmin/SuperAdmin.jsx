import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
// import { CommonHeader } from "../CommonHeader/CommonHeader";
import { FaCameraRetro } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Chart from "react-apexcharts";
import { MdArrowCircleUp } from "react-icons/md";
// import "bootstrap/dist/css/bootstrap.css";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import { featureVariants } from "../../data/animation";
import { Header } from "../Header/Header";
import axios from "axios";

const SuperAdmin = ({ apiAllCamsDataFromAppCom }) => {
  const options = {
    labels: ["Online", "Offline"],
    colors: ["green", "#ff6f00"],
  };

  const [bulkUploadDisplayMsg, setBulkUploadDisplayMsg] = useState("");

  const [update, setUpdate] = useState([60, 40]);

  // file upload code start

  const [excelFile, setExcelFile] = useState(null);
  const [typeerror, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  //
  // newly add code using filters

  const [onLineStatusNumberState, setOnLineStatusNumberState] = useState(0);

  const [onLineStatusPercentageState, setOnLineStatusPercentageState] =
    useState(0);
  const [offLineStatusNumberState, setOffLineStatusNumberState] = useState(0);

  const [offLineStatusPercentageState, setOffLineStatusPercentageState] =
    useState(0);

  const [mainCamDataFromApp, setMainCamDataFromApp] = useState([
    apiAllCamsDataFromAppCom,
  ]);

  const [secondMainFromMainCam, setSecondMainFromMainCam] = useState([]);

  useEffect(() => {
    setSecondMainFromMainCam(mainCamDataFromApp);
  }, [mainCamDataFromApp]);

  useEffect(() => {
    setMainCamDataFromApp(apiAllCamsDataFromAppCom);
  }, [apiAllCamsDataFromAppCom]);

  const onHeaderDataApplyBtnClick = (data) => {
    // console.log(data);
    const value = mainCamDataFromApp.filter(
      (each) =>
        each.State.includes(data["selectedState"]) &&
        each.District_Name.includes(data["selectedDist"]) &&
        each.AC_Name.includes(data["selectedAssembly"]) &&
        each.Status.includes(data["selectedMode"])
    );

    setSecondMainFromMainCam(value);
  };

  // newly add code using filter end
  //

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please Select Excel File");
        setExcelFile(null);
      }
    } else {
      console.log("Please Select File");
    }
  };

  useEffect(() => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  }, [excelFile]);

  const handleFileSubmit = (e) => {
    e.preventDefault();
    // console.log(excelData);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");

    headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

    const bulkUploadedSuperAdmin = async () => {
      const API = axios.create({
        baseURL: "http://localhost:8081",
      });
      await API.post("/bulk-upload", excelData, {
        headers: headers,
      })
        .then((res) => {
          console.log(res.data);
          setBulkUploadDisplayMsg(res.data);
          // setApiAllCamsDataFromAppCom(res.data);
          //  setInitialCam(res.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    bulkUploadedSuperAdmin();
  };

  // file upload code end

  // super-admin-charts-display-calculations start

  useEffect(() => {
    setUpdate([onLineStatusPercentageState, offLineStatusPercentageState]);
  }, [onLineStatusPercentageState, offLineStatusPercentageState]);

  useEffect(() => {
    let onLineStatusNumber = secondMainFromMainCam.filter(
      (each) => each.Status === "online"
    );
    let offLineStatusNumber =
      secondMainFromMainCam.length - onLineStatusNumber.length;
    let onLineStatusPercentage =
      (onLineStatusNumber.length / secondMainFromMainCam.length) * 100;

    let offLineStatusPercentage =
      (offLineStatusNumber / secondMainFromMainCam.length) * 100;

    // console.log(onLineStatusPercentage);

    // console.log(offLineStatusPercentage);
    setOnLineStatusNumberState(onLineStatusNumber);
    setOnLineStatusPercentageState(onLineStatusPercentage);
    setOffLineStatusNumberState(offLineStatusNumber);
    setOffLineStatusPercentageState(offLineStatusPercentage);
  }, [secondMainFromMainCam]);

  // super-admin-charts-display-calculations end

  // console.log(secondMainFromMainCam);

  return (
    <div className="super__admin__main">
      <Header
        onHeaderDataApplyBtnClick={onHeaderDataApplyBtnClick}
        apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom}
      />
      <motion.div
        initial="offscreen"
        whileInView={"onscreen"}
        variants={featureVariants}
        className="super__admin__main__cats__card"
      >
        <div className="chats_first_card">
          <h2>
            Hi,{" "}
            <span
              style={{
                color: "#ff6f00",
              }}
            >
              SuperAdmin
            </span>
          </h2>
          <span>In this report you will find yor cam status</span>
          <div className="all__cam__card">
            <div className="super_admin_car_number_card">
              <div>
                <div
                  className="icond__back__change"
                  style={{
                    background: "rgb(132, 232, 245)",
                  }}
                >
                  <FaCameraRetro />
                </div>
                <BsThreeDots size={22} />
              </div>
              <div
                style={{
                  fontFamily: "Courier New, Courier, monospace",
                }}
              >
                <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                  {secondMainFromMainCam.length}
                </h3>
                <span>Total Cams</span>
              </div>
              <div
                className="cam_percentage_card"
                style={{
                  color: "rgb(132, 232, 245)",
                }}
              >
                <MdArrowCircleUp size={20} />
                <span>100%</span>
              </div>
            </div>
            {/* second */}
            <div className="super_admin_car_number_card">
              <div>
                <div
                  className="icond__back__change"
                  style={{
                    background: "green",
                  }}
                >
                  <FaCameraRetro />
                </div>
                <BsThreeDots size={22} />
              </div>
              <div
                style={{
                  fontFamily: "Courier New, Courier, monospace",
                }}
              >
                <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                  {onLineStatusNumberState.length}
                </h3>
                <span>On-line</span>
              </div>
              <div
                className="cam_percentage_card"
                style={{
                  color: "green",
                }}
              >
                <MdArrowCircleUp size={20} />
                <span>{onLineStatusPercentageState.toFixed()}%</span>
              </div>
            </div>
            {/* third */}
            <div className="super_admin_car_number_card">
              <div>
                <div
                  className="icond__back__change"
                  style={{
                    background: "#ff6f00",
                  }}
                >
                  <FaCameraRetro />
                </div>
                <BsThreeDots size={22} />
              </div>
              <div
                style={{
                  fontFamily: "Courier New, Courier, monospace",
                }}
              >
                <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                  {offLineStatusNumberState}
                </h3>
                <span>Off-line</span>
              </div>
              <div
                className="cam_percentage_card"
                style={{
                  color: "#ff6f00",
                }}
              >
                <MdArrowCircleUp size={20} />
                <span>{offLineStatusPercentageState.toFixed()}%</span>
              </div>
            </div>
            {/* third end */}
          </div>
        </div>
        <div className="chats_second_card">
          <div className="chart__card">
            <h4>Status of Cameras</h4>
            <Chart
              options={options}
              series={update}
              type="donut"
              width="100%"
            />
          </div>
        </div>
      </motion.div>
      {/* <div className="bulk__upload__main__card">
        
        <input type="file" className="upload__input__tag" accept=".csv" />
        <button>Submit</button>
      </div> */}
      <div className="side_bar_upload_cams_data_card">
        <h2>Upload a Cams Data</h2>
      </div>

      <form className="bulk__upload__main__card" onSubmit={handleFileSubmit}>
        <input
          type="file"
          className="upload__input__tag"
          required
          onChange={handleFile}
        />

        <button type="submit" className="btn btn-success btn-md">
          UPLOAD
        </button>
      </form>
      {bulkUploadDisplayMsg && <p>{bulkUploadDisplayMsg.msg}</p>}
      {typeerror && (
        <div className="alert alert-danger" role="alert">
          {typeerror}
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
