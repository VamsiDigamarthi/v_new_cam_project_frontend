import React, { useEffect, useState } from "react";
import "./Home.css";
import { Header } from "../Header/Header";
import ReactPlayer from "react-player";
// import { values } from "../../data/camsdata";

import ReactPaginate from "react-paginate";
// import { useDispatch, useSelector } from "react-redux";
// import { allCamsData } from "../../action/CamAction";

const Home = ({ apiAllCamsDataFromAppCom }) => {
  const [mainCamDataFromApp, setMainCamDataFromApp] = useState([
    apiAllCamsDataFromAppCom,
  ]);

  const [initialCam, setInitialCam] = useState(null);

  // const dispatch = useDispatch();

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 6;

  const currentItems = mainCamDataFromApp?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(mainCamDataFromApp?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % mainCamDataFromApp?.length;
    setItemOffset(newOffset);
  };

  //pagination end
  const getALlCamsDataFun = () => {
    setInitialCam(mainCamDataFromApp[0]);
  };
  useEffect(() => {
    getALlCamsDataFun();
    setMainCamDataFromApp(apiAllCamsDataFromAppCom);
  }, [apiAllCamsDataFromAppCom, mainCamDataFromApp]);

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

  return (
    <div className="home__main">
      <Header apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom} />
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
            <input type="text" placeholder="Pc No" />
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
                style={{
                  border:
                    each.mode === "Online"
                      ? "2px solid green"
                      : "2px solid #ff6f00",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              />
              <div className="multi__video__number__card">
                <h4>Some Dist Name</h4>
                <p>
                  Ps no <span>202</span>
                </p>
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
