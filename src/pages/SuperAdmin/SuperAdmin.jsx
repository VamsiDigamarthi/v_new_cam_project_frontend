import React, { useState } from "react";
import "./SuperAdmin.css";
import { CommonHeader } from "../CommonHeader/CommonHeader";
import { FaCameraRetro } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Chart from "react-apexcharts";
import { MdArrowCircleUp } from "react-icons/md";
// import "bootstrap/dist/css/bootstrap.css";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import { featureVariants } from "../../data/animation";

const percentage = [
  {
    id: "1",
    percentage: "100.0 %",
    text: "Total Cams",
  },
  {
    id: "2",
    percentage: "64.0 %",
    text: "On-line",
  },
  {
    id: "3",
    percentage: "42.0 %",
    text: "Off-line",
  },
];

const SuperAdmin = () => {
  const [options, setOptions] = useState({
    labels: ["Online", "Offline"],
    colors: ["green", "#ff6f00"],
  });

  const [update, setUpdate] = useState([60, 40]);

  // file upload code start

  const [excelFile, setExcelFile] = useState(null);
  const [typeerror, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);

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
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  };

  // file upload code end
  console.log(excelData);

  return (
    <div className="super__admin__main">
      <CommonHeader />
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
            {percentage.map((each, key) => (
              <div className="super_admin_car_number_card">
                <div>
                  <div
                    className="icond__back__change"
                    style={{
                      background:
                        key === 0
                          ? "rgb(132, 232, 245)"
                          : key === 1
                          ? "green"
                          : "#ff6f00",
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
                    2034
                  </h3>
                  <span>{each.text}</span>
                </div>
                <div
                  className="cam_percentage_card"
                  style={{
                    color:
                      key === 0
                        ? "rgb(132, 232, 245)"
                        : key === 1
                        ? "green"
                        : "#ff6f00",
                  }}
                >
                  <MdArrowCircleUp size={20} />
                  <span>{each.percentage}</span>
                </div>
              </div>
            ))}
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
      {typeerror && (
        <div className="alert alert-danger" role="alert">
          {typeerror}
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
