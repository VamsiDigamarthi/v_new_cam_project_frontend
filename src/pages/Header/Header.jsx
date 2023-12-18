import React, { useEffect, useState } from "react";
import "./Header.css";
import { BiBell } from "react-icons/bi";
import { useSelector } from "react-redux";

export const Header = ({
  onHeaderDataApplyBtnClick,
  apiAllCamsDataFromAppCom,
}) => {
  const [state, setState] = useState([]);

  const [disticts, setDisticts] = useState([]);

  const [assembly, setAssembly] = useState([]);

  const UUU = useSelector((state) => state.authReducer.authData);

  // selected value by user selecet element start

  const [selectedState, setSelectedState] = useState("");

  const [selectedDist, setSelectedDist] = useState("");

  const [selectedAssembly, setSelectedAssembly] = useState("");

  const [selectedMode, setSelectedMode] = useState("");

  // selected value by user selecet element end

  useEffect(() => {
    const unique = [
      ...new Set(apiAllCamsDataFromAppCom?.map((item) => item.State)),
    ];
    // console.log(unique);
    setState(unique);
  }, [apiAllCamsDataFromAppCom]);

  const selectSate = (e) => {
    setDisticts([]);
    setAssembly([]);
    setSelectedDist("");
    // setSelectedAssembly("");
    setSelectedMode("");
    let value;
    if (e.target.value === "all") {
      value = "";
      setSelectedDist("");
      setDisticts([]);
      setSelectedState(value);
      setSelectedAssembly("");
      //
      return;
    } else {
      value = e.target.value;
    }
    // console.log(value);
    const uniqueDist = apiAllCamsDataFromAppCom?.filter((e) => {
      return value !== "" ? e.State.includes(value) : [];
    });

    // console.log(uniqueDist);

    const uniqueDists = [
      ...new Set(uniqueDist.map((item) => item.District_Name)),
    ];

    // console.log(uniqueDists);

    setDisticts(uniqueDists);
    setSelectedState(value);
    setSelectedAssembly("");
    setSelectedDist("");
  };

  const selectDistName = (e) => {
    setAssembly([]);
    setSelectedMode("");
    let value;
    if (e.target.value === "all") {
      value = "";
      setSelectedAssembly("");
      setAssembly([]);
      setSelectedDist("");
      return;
    } else {
      value = e.target.value;
    }
    const uniqueAssembly = apiAllCamsDataFromAppCom?.filter(
      (e) => e.District_Name.includes(value) && e.State.includes(selectedState)
    );
    const uniqueAssemblys = [
      ...new Set(uniqueAssembly.map((item) => item.AC_Name)),
    ];
    setSelectedAssembly("");
    setAssembly(uniqueAssemblys);
    setSelectedDist(value);
  };

  const onSelectAssembly = (e) => {
    setSelectedMode("");
    let value;
    if (e.target.value === "all") {
      value = "";
    } else {
      value = e.target.value;
    }
    setSelectedAssembly(value);
  };

  const onSelectMode = (e) => {
    let value;
    if (e.target.value === "all") {
      value = "";
    } else {
      value = e.target.value;
    }
    setSelectedMode(value);
  };

  // console.log(selectedState);

  // console.log(selectedDist);

  // console.log(selectedAssembly);

  // apply btn click

  const onApplyBtnClick = () => {
    onHeaderDataApplyBtnClick({
      selectedState,
      selectedDist,
      selectedAssembly,
      selectedMode,
    });
  };

  return (
    <div className="header__main">
      <div>
        <select onChange={selectSate}>
          <option disabled selected hidden>
            select state
          </option>
          <option>all</option>
          {state.map((each, key) => (
            <option key={key}>{each}</option>
          ))}
        </select>
        <select onChange={selectDistName}>
          <option disabled selected hidden>
            select disct
          </option>
          <option>all</option>
          {disticts.map((each, key) => (
            <option key={key}>{each}</option>
          ))}
        </select>
        <select onChange={onSelectAssembly}>
          <option disabled selected hidden>
            select assembly
          </option>
          <option>all</option>
          {assembly.map((each, key) => (
            <option key={key}>{each}</option>
          ))}
        </select>
        <select onChange={onSelectMode}>
          <option disabled selected hidden>
            status
          </option>
          <option>all</option>
          <option>offline</option>
          <option>online</option>
          {/* <option>sdkndc</option> */}
        </select>
        <button onClick={onApplyBtnClick}>Apply</button>
      </div>
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
