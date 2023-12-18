import React, { useEffect, useState } from "react";
import "./Home.css";
import { Header } from "../Header/Header";
import ReactPlayer from "react-player";
// import { values } from "../../data/camsdata";

import ReactPaginate from "react-paginate";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { allCamsData } from "../../action/CamAction";
let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "*");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

const Home = ({ apiAllCamsDataFromAppCom }) => {
  const [mainCamDataFromApp, setMainCamDataFromApp] = useState([
    apiAllCamsDataFromAppCom,
  ]);

  //

  const [
    disablePcInputWheneFilterDataEmpty,
    setDisablePcInputWheneFilterDataEmpty,
  ] = useState(true);

  const [mainFirstFromMainCam, setMainFirstFromMainCam] = useState([]);

  const [secondMainFromMainCam, setSecondMainFromMainCam] = useState([]);

  //
  const [initialCam, setInitialCam] = useState(null);

  // apply btn click loader state

  const [applyBtnLoader, setApplyBtnLoader] = useState(false);

  // const dispatch = useDispatch();

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 6;

  const currentItems = secondMainFromMainCam?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(secondMainFromMainCam?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % secondMainFromMainCam?.length;
    setItemOffset(newOffset);
  };

  //pagination end
  const getALlCamsDataFun = () => {
    setInitialCam(mainCamDataFromApp[0]);
  };

  useEffect(() => {
    getALlCamsDataFun();
    setSecondMainFromMainCam(mainCamDataFromApp);
  }, [mainCamDataFromApp]);

  useEffect(() => {
    setMainCamDataFromApp(apiAllCamsDataFromAppCom);
  }, [apiAllCamsDataFromAppCom]);

  // select cam

  const onSelectVideoCam = (each) => {
    // console.log(each);
    setInitialCam(each);
  };

  // console.log(initialCam);

  // const API = axios.create({
  //       baseURL: "http://localhost:8081",
  //     });
  //     await API.get("/all-cams")
  //       .then((res) => {
  //         // console.log(res.data);
  //         setAllCamsApiData(res.data);
  //         setInitialCam(res.data[0]);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });

  const onSearchBasedOnPcNo = (e) => {
    if (disablePcInputWheneFilterDataEmpty) {
      let value;
      if (mainFirstFromMainCam.length > 0) {
        value = mainFirstFromMainCam.filter((each) =>
          e.target.value === "" ? each : each.PS_No.includes(e.target.value)
        );
      } else {
        value = mainCamDataFromApp.filter((each) =>
          e.target.value === "" ? each : each.PS_No.includes(e.target.value)
        );
      }
      setSecondMainFromMainCam(value);
    }
  };

  //

  const onHeaderDataApplyBtnClick = async (data) => {
    // console.log(data);
    setApplyBtnLoader(true);
    const API = axios.create({
      baseURL: "http://localhost:8081",
    });
    await API.get(
      `/filter-data-from-btn-click?State=${data["selectedState"]}&Dist=${data["selectedDist"]}&Assembly=${data["selectedAssembly"]}&Status=${data["selectedMode"]}`,
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        if (res.data <= 0) {
          setDisablePcInputWheneFilterDataEmpty(false);
        } else {
          setDisablePcInputWheneFilterDataEmpty(true);
        }
        setInitialCam(res?.data[0]);
        setApplyBtnLoader(false);
        setMainFirstFromMainCam(res.data);
        setSecondMainFromMainCam(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // const value = mainCamDataFromApp.filter(
    //   (each) =>
    //     each.State.includes(data["selectedState"]) &&
    //     each.District_Name.includes(data["selectedDist"]) &&
    //     each.AC_Name.includes(data["selectedAssembly"]) &&
    //     each.Status.includes(data["selectedMode"])
    // );

    // // console.log(value.length);

    // if (value.length <= 0) {
    //   setDisablePcInputWheneFilterDataEmpty(false);
    // } else {
    //   setDisablePcInputWheneFilterDataEmpty(true);
    // }
    // setMainFirstFromMainCam(value);
    // setSecondMainFromMainCam(value);
    // console.log(value);
  };

  // console.log(currentItems);

  return (
    <div className="home__main">
      <Header
        onHeaderDataApplyBtnClick={onHeaderDataApplyBtnClick}
        apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom}
      />
      <div className="home__video__player__main__card">
        <div className="main__player__left__side">
          <h1>Live Streaming</h1>
          <h3>{initialCam?.State}</h3>
          <p>
            Dist <span>{initialCam?.District_Name}</span>
          </p>
          <p>
            Ps No <span>{initialCam?.PS_No}</span>
          </p>
          <p>
            As No <span>{initialCam?.AC_No}</span>
          </p>
          <span>The best streamer gather here to have a good time</span>
        </div>
        <div>
          <ReactPlayer
            url={initialCam?.url}
            controls="true"
            // height="550px"
            muted="false"
            playing="true"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div className="home__all__cams__display">
        <div className="home__all_cams__header__card">
          <h3>Stream of all Cams</h3>
          <div>
            <input
              onChange={onSearchBasedOnPcNo}
              type="text"
              placeholder="Pc No"
            />
            <button>Search</button>
          </div>
        </div>
        {/* multi vidos */}
        <div className="home__multi__all__small__videos">
          {currentItems?.map((each, key) => (
            <div
              onClick={() => onSelectVideoCam(each)}
              style={{
                width: "31.5%",
                display: "flex",
                flexDirection: "column",
                gap: "0.1rem",
                position: "relative",
              }}
              key={key}
              className="home_display_multi_cam"
            >
              {/* <p className="badge">0</p> */}
              <ReactPlayer
                url={each.url}
                controls="true"
                // height="550px"
                muted="false"
                playing="true"
                width="100%"
                height="100%"
                // style={{
                //   border:
                //     each.mode === "Online"
                //       ? "2px solid green"
                //       : "2px solid #ff6f00",
                //   borderRadius: "10px",
                //   overflow: "hidden",
                // }}
              />
              <div className="multi__video__number__card">
                <div>
                  <h4>{each.District_Name}</h4>
                  <h4>{each.AC_Name}</h4>
                </div>
                <div className="mutli_video_number_second_card">
                  <p>
                    Ps no{" "}
                    <span
                      style={{
                        color: each.Status === "online" ? "green" : "#ff6f00",
                      }}
                    >
                      {each.PS_No}
                    </span>
                  </p>
                  <p>
                    Ac no{" "}
                    <span
                      style={{
                        color: each.Status === "online" ? "green" : "#ff6f00",
                      }}
                    >
                      {each.AC_No}
                    </span>
                  </p>
                </div>
              </div>
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

export default Home;
