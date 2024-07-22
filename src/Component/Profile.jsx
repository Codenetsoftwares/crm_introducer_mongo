import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import verify from "../Assets/verify.png";
import "./Profile.css";
import Add from "../Assets/Addd.png";
import Edit from "../Assets/editt.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ModalBank from "./ModalBank";
import AccountsService from "../Services/AccountsService";
import ModalBankView from "./ModalBankView";
import "./Profile.css";
import Editicon from "../Assets/Editpas.png";
import WeeklyReport from "./Modal/WeeklyReport";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const id = auth.user.id;
  console.log("This is Auth=>", auth);
  const [userAuth, setUserAuth] = useState([]);
  const [profiledata, setProfiledata] = useState([]);
  const [FoundObject, setFoundObject] = useState([]);
  // const [Lbalance setLbalance] = useState([]);
  const [balance, setBalance] = useState([]);

  const handleLogout = () => {
    const response = true;
    if (response) {
      alert("You are going to Logout from this site");
      auth.logout();
      navigate("/");
    }
  };

  useEffect(() => {
    AccountsService.getprofile(auth.user).then((res) =>
      setProfiledata(res.data)
    );
  }, [auth, id]);
  console.log("This is Profile Data =>>>", profiledata);

  useEffect(() => {
    AccountsService.liveBalance(id, auth.user).then((res) =>
      setBalance(res.data)
    );
  }, [auth, id]);
  console.log("This is Live Balance=>>>", balance);

  // useEffect(() => {
  //   AccountsService.getprofile(auth.user)
  //     .then((res) => {
  //       setProfiledata(res.data);

  //       const userWithId = res.data.find((user) => user._id === id);

  //       setFoundObject(userWithId);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching user data:", error);
  //     });
  // }, [auth, id]);

  // console.log("This is profile data ==>>>", profiledata);
  const handeleditprofile = () => {
    navigate(`/editprofile/${profiledata._id}`);
  };

  const handleStatement = () => {
    navigate(`/statement`);
  };

  const handleMyNetwork = () => {
    navigate(`/mynetworks`);
  };

  const handelresetpass = () => {
    navigate("/Resetpasword");
  };
  return (
    <div
      style={{
        backgroundImage:
          " linear-gradient(90deg, rgba(236,208,146,1) 0%, rgba(252,255,131,0.9500175070028011) 50%, rgba(236,208,146,1) 100%)",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <section className="mt-5 pt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ul className="breadcrumb mb-0 d-flex justify-content-between">
                  <button type="button" className="btn border-0">
                    <b>My Profile</b>
                  </button>

                  <button
                    type="button"
                    className="btn border-0"
                    onClick={handleMyNetwork}
                  >
                    <b>My Network</b>
                  </button>

                  <button
                    type="button"
                    className="btn border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#weeklyreport"
                  >
                    <b>Weekly Report</b>
                  </button>

                  <button
                    type="button"
                    className="btn border-0"
                    onClick={handleStatement}
                  >
                    <b>Statement</b>
                  </button>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4" style={{ height: "31.8rem" }}>
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3 pt-3">
                    Hi!&nbsp;{profiledata.firstname}
                  </h5>
                  {/* <marquee className="news-content"> */}
                  <p className="text-muted">
                    Current Due :{" "}
                    {profiledata.currentDue > 0 ? (
                      <blink>
                        {" "}
                        <b className="blink_me" style={{ color: "green" }}>
                          {parseInt(profiledata.currentDue)}
                        </b>
                      </blink>
                    ) : (
                      <b className="blink_me" style={{ color: "red" }}>
                        <blink>{parseInt(profiledata.currentDue)}</blink>
                      </b>
                    )}
                  </p>
                  <p></p>
                  {/* </marquee> */}
                  <p className="text-muted ">{profiledata.email}</p>
                  <p className="text-muted mb-4 ">
                    <img
                      src={verify}
                      style={{
                        width: "20px",
                        border: "2px #20b1f5",
                        borderRadius: "15px",
                      }}
                    />
                    &nbsp;Verified By Obhisab.com
                  </p>
                  <div className="d-flex justify-content-center mb-2 pt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                    {/* <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                      onClick={handeleditprofile}
                    >
                      <small>Edit Profile</small>
                    </button> */}
                  </div>
                </div>
              </div>
              {/* ... Other content ... */}
            </div>
            <div className="col-lg-8">
              <div
                className="card mb-4 shadow-sm profile-card"
                style={{ height: "31.8rem" }}
              >
                <div className="card-body">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fas fa-user"></i> Name
                        </th>
                        <td>
                          {profiledata.firstname} {profiledata.lastname}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fas fa-user-tag"></i> Username
                        </th>
                        <td>{profiledata.userName}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fas fa-user-shield"></i> Role
                        </th>
                        <td className="text-uppercase">{profiledata.role}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fas fa-wallet"></i> Live Balance
                        </th>
                        <td className="text-uppercase">
                          {parseInt(balance.LiveBalance).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fas fa-hand-holding-usd"></i>
                          Lifetime Payment
                        </th>
                        <td className="text-uppercase">
                          {parseInt(profiledata.balance).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fas fa-money-bill-wave"></i> Current
                          Due
                        </th>
                        <td className="text-uppercase">
                          {parseInt(profiledata.currentDue).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fas fa-key"></i> Password
                        </th>
                        <td>
                          ********
                          <img
                            src={Editicon}
                            alt="Edit icon"
                            style={{
                              width: "25px",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                            onClick={handelresetpass}
                            title="Reset"
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.4)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <style jsx>{`
              .profile-card {
                border-radius: 15px;
                border: none;
                background: linear-gradient(135deg, #ececec, #ffffff);
                transition: transform 0.3s ease;
              }
              .profile-card:hover {
                transform: translateY(-10px);
              }
              .card-body {
                background: linear-gradient(to bottom right, #f7f9fc, #e2ebf0);
                padding: 20px;
              }
              .table th {
                width: 30%;
                vertical-align: middle;
                font-weight: bold;
              }
              .table td {
                vertical-align: middle;
              }
              .text-primary {
                color: #007bff;
              }
              .table-borderless th,
              .table-borderless td {
                border: none;
              }
              .fas {
                margin-right: 10px;
              }
              .profile-card img {
                transition: transform 0.3s ease;
              }
            `}</style>
          </div>
        </div>
      </section>
      {/* <ModalBankView />
      <Modal />
      <ModalBank /> */}
      <WeeklyReport />
    </div>
  );
};

export default Profile;
