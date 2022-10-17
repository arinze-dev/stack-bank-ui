import React from "react";
import "./transfer.css";
import { useEffect, useState } from "react";
import {
  PreTransferThunk,
  TransferThunk,
  selectPreTX,
  Reset,
} from "../../redux/auth/TXSlice";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Transfer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(Reset());
  }, []);

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

  // const backFun = function (e) {
  //   e.preventDefault();
  //   SetTxData({
  //     amount: "",
  //     message: "",
  //     accountnumber: "",
  //   });
  //   SetEnable((prev) => !prev);
  // };

  const PreData = useSelector(selectPreTX);

  const MainTransfer = function (e) {
    e.preventDefault();
    dispatch(TransferThunk(TxData));
    dispatch(Reset());
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
      } else if (PreData.error) {
        let msg = await PreData.error.message;
        let msg2 = await PreData.error.msg;

        console.log(msg, msg2);
        {
          PreData.error &&
            toast.error(msg, { position: toast.POSITION.TOP_CENTER });
        }
        {
          PreData.error &&
            toast.error(msg2, { position: toast.POSITION.TOP_CENTER });
        }
      }
    }
    checkTransfer();
  }, [PreData]);

  // if (
  //   PreData.data == "successful transfer" ||
  //   PreData.error == "successful transfer"
  // ) {
  //   dispatch(Reset());
  // }

  return (
    <div className="content-transter">
      <div className="details">
        {" "}
        <h4>Transter Form</h4>{" "}
      </div>
      <form action="">
        <input
          type="number"
          placeholder="Amount"
          onChange={checkOthers}
          name="amount"
        />
        {TxData.amount && (
          <input
            type="text"
            placeholder="Message"
            onChange={checkOthers}
            name="message"
          />
        )}
        {TxData.message && (
          <input
            type="number"
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
            Transfer{" "}
          </button>
        )}
      </form>
    </div>
  );
}
// (preventDefault())
export default Transfer;
