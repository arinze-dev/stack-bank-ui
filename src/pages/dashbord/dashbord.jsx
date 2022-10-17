import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Transactions from "../../components/transactionDetail/Transactions";
import Loan from "../../components/loan/loan";
import Airtime from "../../components/airtime/airtime";
import { useNavigate } from "react-router-dom";
import Transfer from "../../components/transfer/transfer";
import {
  dashDoardThunnk,
  selectDashBoard,
} from "../../redux/auth/dashboardSlice";
import "./dashbord.css";

function Dashbord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { dashboard } = useSelector(selectDashBoard)

  const [display, setDisplay] = useState({
    Transfer: "",
    Airtime: "",
    Loan: "",
    Dashbord: "true",
  });

  const [userTX, setUserTX] = useState();

  let userDetail = useSelector(selectDashBoard);

  let { data, error, status } = userDetail;

  useEffect(() => {
    dispatch(dashDoardThunnk());
  }, [dispatch]);

  useEffect(() => {
    userDetail.data && setUserTX(userDetail.data.accountDetails);
  }, [dispatch, userDetail]);

  const logout = function () {
    sessionStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  let DisplyOption = function (e) {
    setDisplay({ Transfer: "", Airtime: "", Loan: "", Dashbord: "" });
    setDisplay((prev) => ({ ...prev, [e.target.name]: "true" }));

    if (e.target.value === "Dashbord") {
      dispatch(dashDoardThunnk());
    }
  };
  return (
    <div className="dashbord">
      <div className="side-dashbord">
        <div className="features">
          <button
            className="dashbord-btn"
            name="Dashbord"
            onClick={DisplyOption}
          >
            Dashbord{" "}
          </button>
          <button
            className="Transfer-btn"
            name="Transfer"
            onClick={DisplyOption}
          >
            Transfer
          </button>
          <button className="loan-btn" name="Loan" onClick={DisplyOption}>
            Loan
          </button>
          <button className="Airtime-btn" name="Airtime" onClick={DisplyOption}>
            Airtime
          </button>
        </div>
      </div>
      <div className="main-dashbord">
        <div className="user-details">
          <div className="details-1">
            <div className="detail">
              <div className="nameSpace">
                {status == "fulfilled" && (
                  <>
                    <div className="nameSpace-1">
                      {" "}
                      <p>Surname: </p> <p> {data.firstname}</p>
                    </div>
                    <div className="nameSpace-1">
                      {" "}
                      <p>FirstName: </p> <p> {data.lastname}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="nameSpace">
                {status == "fulfilled" && (
                  <>
                    <div className="nameSpace-2">
                      {" "}
                      <p>Phone: </p> <p> {data.phone}</p>
                    </div>
                    <div className="nameSpace-2">
                      {" "}
                      <p>AccNumber: </p> <p> {data.accountnumber}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="details-2">
            {status == "fulfilled" && (
              <>
                <div className="balance">
                  <h3> balance</h3>
                  <p>₦ {data?.balance?.$numberDecimal}</p>
                  <button className="logout" onClick={logout}>
                    LogOut
                  </button>
                </div>
                <div className="total-stuff">
                  <div>
                    <p>total desposit</p>
                    <p>₦ {data?.totalDeposit?.$numberDecimal}</p>
                  </div>
                  <div>
                    <p>total withdrew</p>
                    <p>₦ {data?.totalWithdraw?.$numberDecimal}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="other-element">
          {display.Airtime && <Airtime />}
          {display.Loan && <Loan />}
          {display.Transfer && <Transfer />}
          {display.Dashbord &&
            status == "fulfilled" &&
            userTX?.map((item, index) => {
              return <Transactions key={index} TheValues={item} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
