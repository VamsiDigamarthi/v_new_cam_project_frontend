import React, { useEffect, useState } from "react";
import "./Admin.css";

import { Header } from "../Header/Header";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { GoDotFill } from "react-icons/go";
import { FaDownload } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const dropIn = {
//   hidden: {
//     y: "-100vh",
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.1,
//       type: "spring",
//       damping: 25,
//       stiffness: 500,
//     },
//   },
//   exit: {
//     y: "100vh",
//     opacity: 0,
//   },
// };

const deleteDropIn = {
  hidden: {
    // y: "-100vh",
    opacity: 0.5,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};

const Admin = ({ apiAllCamsDataFromAppCom, getALlCamsDataFun }) => {
  const [mainCamAdminDataFromApp, setMainCamAdminDataFromApp] = useState([
    apiAllCamsDataFromAppCom,
  ]);

  const [mainFirstFromMainCam, setMainFirstFromMainCam] = useState([]);

  const [
    disablePcInputWheneFilterDataEmpty,
    setDisablePcInputWheneFilterDataEmpty,
  ] = useState(true);

  const [secondMainFromMainCam, setSecondMainFromMainCam] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);

  // edit modal open state

  const [openEditModal, setOpenEditModal] = useState(false);

  // delete modal state

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editModalSendDataFromAdminState, setEditModalSendDataFromAdminState] =
    useState(null);

  const [
    deleteModalSendDataFromAdminState,
    setDeleteModalSendDataFromAdminState,
  ] = useState(null);

  const endOffset = itemOffset + 6;

  const currentItems = secondMainFromMainCam?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(secondMainFromMainCam?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % secondMainFromMainCam?.length;
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
    if (disablePcInputWheneFilterDataEmpty) {
      let value;
      if (mainFirstFromMainCam.length > 0) {
        value = mainFirstFromMainCam.filter((each) =>
          e.target.value === "" ? each : each.PS_No.includes(e.target.value)
        );
      } else {
        value = mainCamAdminDataFromApp.filter((each) =>
          e.target.value === "" ? each : each.PS_No.includes(e.target.value)
        );
      }
      setSecondMainFromMainCam(value);
    }
  };

  // header data from header apply btn start

  const onHeaderDataApplyBtnClick = (data) => {
    // console.log(data);
    const value = mainCamAdminDataFromApp.filter(
      (each) =>
        each.State.includes(data["selectedState"]) &&
        each.District_Name.includes(data["selectedDist"]) &&
        each.AC_Name.includes(data["selectedAssembly"]) &&
        each.Status.includes(data["selectedMode"])
    );

    console.log(value.length);

    if (value.length <= 0) {
      setDisablePcInputWheneFilterDataEmpty(false);
    } else {
      setDisablePcInputWheneFilterDataEmpty(true);
    }
    setMainFirstFromMainCam(value);
    setSecondMainFromMainCam(value);
    // console.log(value);
  };

  // edit modal open start

  const onEditModalOpen = (data) => {
    setOpenEditModal(true);
    // console.log(data);
    setEditModalSendDataFromAdminState(data);
  };

  const onEditModalCrossClick = () => {
    setOpenEditModal(false);
    setEditModalSendDataFromAdminState("");
  };
  // edit modal open end

  const onCloseModal = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  };

  const onOpenDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const onDeleteModalOpen = (id) => {
    setOpenDeleteModal(true);
    setDeleteModalSendDataFromAdminState(id);
  };

  const deleteTost = () =>
    toast.warn("delete cam succesfully ....!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const editTost = () =>
    toast.success("edit cam suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="admin__main__card"
        style={{
          filter: (openEditModal || openDeleteModal) && "blur(8px)",
        }}
      >
        <Header
          onHeaderDataApplyBtnClick={onHeaderDataApplyBtnClick}
          apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom}
        />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <h2>Welcome . . . . . ?</h2>
        {/* filter table ui */}
        <div className="table__filter__ui" onClick={onCloseModal}>
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
                      color:
                        each.Status !== "online" ? "#ff6f00" : "greenyellow",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  >
                    <GoDotFill />
                  </div>
                  {each.Status}
                </span>
                <span className="table__header__last__span new__add__icons__style">
                  <MdEdit onClick={() => onEditModalOpen(each)} size={20} />
                  <MdDelete
                    onClick={() => onDeleteModalOpen(each?.id)}
                    size={20}
                  />
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
      </motion.div>
      {openEditModal && (
        <motion.div
          variants={deleteDropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="edit_modal_card"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span>Edit Cams Details</span>
            <ImCross onClick={onEditModalCrossClick} />
          </div>
          <EditModal
            getALlCamsDataFun={getALlCamsDataFun}
            onEditModalCrossClick={onEditModalCrossClick}
            editModalSendDataFromAdminState={editModalSendDataFromAdminState}
            editTost={editTost}
          />
        </motion.div>
      )}
      {openDeleteModal && (
        <motion.div
          variants={deleteDropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="delete_modal_card"
        >
          <div>
            <ImCross color="lightgreen" onClick={onOpenDeleteModal} />
          </div>
          <DeleteModal
            deleteModalSendDataFromAdminState={
              deleteModalSendDataFromAdminState
            }
            getALlCamsDataFun={getALlCamsDataFun}
            onOpenDeleteModal={onOpenDeleteModal}
            deleteTost={deleteTost}
          />
        </motion.div>
      )}
    </>
  );
};

export default Admin;
