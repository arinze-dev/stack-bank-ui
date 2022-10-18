import React, { useEffect } from "react";
import "./loan.css";
import { LoanThunk, selectPreTX, Reset } from "../../redux/auth/TXSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {} form
import { ColorRing } from "react-loader-spinner";
import { useState } from "react";
import { toast } from "react-toastify";

function Loan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(Reset());
  // }, []);

  const LoanTx = useSelector(selectPreTX);
  const [LoanData, setLoanData] = useState({
    amount: "",
  });

  const CheckLength = function (e) {
    setLoanData((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value),
    }));
  };

  const LoanFUNC = function (e) {
    e.preventDefault();
    if (LoanData.amount) {
      dispatch(LoanThunk(LoanData));
    }
  };

  useEffect(() => {
    async function checkLoan() {
      if (LoanTx.status == "Fulfilled") {
        {
          LoanTx.data &&
            toast.success(LoanTx.data, { position: toast.POSITION.TOP_CENTER });
          // dispatch(Reset())
        }
        navigate("/dashbord");
      } else if (LoanTx.error) {
        let msg = (await LoanTx.error) || "Something went wrong";
        // msg = msg.split(' ').splice(0,11).join(" ")
        {
          LoanTx.error &&
            toast.error(msg, { position: toast.POSITION.TOP_CENTER });
        }
      }
    }
    checkLoan();
  }, [LoanTx]);

  if (LoanTx.status == "rejected" || LoanTx.status == "Fulfilled") {
    setTimeout(() => {
      dispatch(Reset());
    }, 3000);
  }

  return (
    <div className="content-loan">
      <div className="details">
        <h4>Loan Form</h4>{" "}
      </div>
      {LoanTx.status === "pending" ? (
        <ColorRing
          visible={true}
          height="100"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        <form action="">
          <input
            type="text"
            placeholder="Amount"
            onChange={CheckLength}
            name="amount"
          />
          <button onClick={LoanFUNC}>Loan</button>
        </form>
      )}
    </div>
  );
}

export default Loan;
