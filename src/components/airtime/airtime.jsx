import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { AirtimeThunk, selectPreTX, Reset } from "../../redux/auth/TXSlice";
import "./airtime.css";

function Airtime() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [airtimeData, setAirtimeData] = useState({ amount: "", phone: "" });

  const checkValue = function (e) {
    e.preventDefault();
    setAirtimeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const AirtimeTX = useSelector(selectPreTX);

  const AirtimeFUN = function (e) {
    e.preventDefault();
    if (airtimeData.amount && airtimeData.phone) {
      dispatch(AirtimeThunk(airtimeData));
    }
  };

  useEffect(() => {
    async function checkAirtime() {
      if (AirtimeTX.status == "Fulfilled") {
        {
          AirtimeTX.data &&
            toast.success(AirtimeTX.data, {
              position: toast.POSITION.TOP_CENTER,
            });
        }
        navigate("/dashbord");
      } else if (AirtimeTX.error) {
        let msg = (await AirtimeTX.error) || "Something went wrong";
        // msg = msg.split(' ').splice(0,11).join(" ")
        {
          AirtimeTX.error &&
            toast.error(msg, { position: toast.POSITION.TOP_CENTER });
        }
      }
    }

    checkAirtime();
  }, [AirtimeTX]);

  if (AirtimeTX.status == "rejected" || AirtimeTX.status == "Fulfilled") {
    setTimeout(() => {
      dispatch(Reset());
    }, 3000);
  }

  return (
    <div className="content-airtime">
      <div className="details">
        <h4>Airtime Form</h4>
      </div>
      {AirtimeTX.status == "pending" ? (
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
            type="number"
            placeholder="Amount"
            onChange={checkValue}
            name="amount"
          />
          <input
            type="number"
            placeholder="Phone Number"
            onChange={checkValue}
            name="phone"
          />
          <button type="button" onClick={AirtimeFUN}>
            Transfer{" "}
          </button>
        </form>
      )}
    </div>
  );
}

export default Airtime;
