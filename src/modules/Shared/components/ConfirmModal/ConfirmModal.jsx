/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/noData.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";

function ConfirmModal({
  handleClose,
  show,
  deleteSelectedValue,
  item,
  selecetedCategory,
}) {
  selecetedCategory;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className="text-end">
          <IoIosCloseCircleOutline
            onClick={handleClose}
            className="class-button"
          />
        </div>
        <div className="confirm-content d-flex flex-column align-items-center">
          <img className="w-50" src={noData} alt="" />
          <span className="confirm-title">Delete This {item} ?</span>
          <span className="confirm-desc">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </span>
          <button
            onClick={() => {
              deleteSelectedValue(selecetedCategory);
              handleClose();
            }}
            className="confirm-delete align-self-end">
            Delete this item
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ConfirmModal;
