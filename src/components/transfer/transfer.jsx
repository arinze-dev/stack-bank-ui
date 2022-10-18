import React from "react";
import "./transfer.css";
import { useEffect, useState } from "react";
import {
  PreTransferThunk,
  TransferThunk,
  selectPreTX,
  Reset,
} from "../../redux/auth/TXSlice";
import { ColorRing } from "react-loader-spinner";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Transfer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(Reset());
  // }, []);

  const [enable, SetEnable] = useState(false);
  const [TxData, SetTxData] = useState({
    amount: "",
    message: "",
    name: "",
    accountnumber: "",
  });

  const checkValue = function (e) {
    e.preventDefault();
    if (TxData.accountnumber.length < 11) {
      SetTxData((prev) => ({
        ...prev,
        [e.target.name]: parseInt(e.target.value),
      }));
    }

    let userdata = {
      accountnumber: e.target.value,
    };

    if (e.target.value.length == 11) {
      if (TxData.amount && TxData.message) {
        {
          TxData && dispatch(PreTransferThunk(userdata));
        }
      }
      SetEnable((prev) => !prev);
    }
  };

  const checkOthers = function (e) {
    SetTxData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(TxData);
  };

  const backFun = function (e) {
    e.preventDefault();
    SetTxData({
      amount: "",
      message: "",
      accountnumber: "",
    });
    SetEnable((prev) => !prev);
  };

  const PreData = useSelector(selectPreTX);

  const MainTransfer = function (e) {
    e.preventDefault();
    dispatch(TransferThunk(TxData));
  };

  useEffect(() => {
    async function checkTransfer() {
      if (PreData.status == "Fulfilled") {
        {
          PreData.data &&
            toast.success(PreData.data, {
              position: toast.POSITION.TOP_CENTER,
            });
        }
        navigate("/dashbord");
      } else if (PreData.status == "rejected") {
        let msg = await PreData.error;
        let msg1 = await PreData.error.errMsg;

        {
          PreData.error &&
            toast.error(msg, { position: toast.POSITION.TOP_CENTER });
        }

        {
          PreData.error.errMsg &&
            toast.error(msg1, { position: toast.POSITION.TOP_CENTER });
        }
      } else {
        let msg = await PreData.error;
        {
          PreData.error &&
            toast.error(msg, { position: toast.POSITION.TOP_CENTER });
        }
      }
    }
    checkTransfer();
  }, [PreData]);

  if (
    PreData.data == "successful transfer" ||
    PreData.error == "transaction feild" ||
    PreData.error
  ) {
    setTimeout(() => {
      dispatch(Reset());
    }, 3000);
  }

  return (
    <div className="content-transter">
      <div className="details">
        <button onClick={backFun}>Back</button>
        <h4>Transter Form</h4>
      </div>
      {PreData.status == "pending" ? (
        <ColorRing
          visible={true}
          height="160"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        <form action="">
          <input
            value={TxData.amount}
            type="number"
            placeholder="Amount"
            onChange={checkOthers}
            name="amount"
          />
          {TxData.amount && (
            <input
              type="text"
              value={TxData.message}
              placeholder="Message"
              onChange={checkOthers}
              name="message"
            />
          )}
          {TxData.message && (
            <input
              type="number"
              value={TxData.accountnumber}
              placeholder="Account Number"
              disabled={enable && true}
              onChange={checkValue}
              name="accountnumber"
            />
          )}
          {PreData.data.firstname && (
            <input
              type="text"
              placeholder="Name"
              name="user"
              value={`${PreData.data?.firstname} ${PreData.data?.lastname}`}
              readOnly
            />
          )}

          {PreData.data?.firstname && (
            <button type="button" onClick={MainTransfer}>
              Transfer
            </button>
          )}
        </form>
      )}
    </div>
  );
}
// (preventDefault())
export default Transfer;
