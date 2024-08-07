import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { jwtDecode } from "jwt-decode"; // Corrected named import
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import SidebarUser from "../../components/SidebarUser";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchCategories(dispatch, token);
      fetchQuizzes(dispatch, token);
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Debugging purpose
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, [dispatch, navigate, token]);

  return (
    <div className="userProfilePage__container">
      <div className="userProfilePage__sidebar">
        <SidebarUser />
      </div>
      {user && (
        <div className="userProfilePage__content">
          <Image
            className="userProfilePage__content--profilePic"
            width="20%"
            height="20%"
            roundedCircle
            src="images/user.png"
          />

          <Table bordered className="userProfilePage__content--table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{user.userName}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>{user.roles}</td>
              </tr>
              <tr>
                <td>Account Status</td>
                <td>True</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
