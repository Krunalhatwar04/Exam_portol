// import React, { useEffect } from "react";
// import { Table } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import "./AdminProfilePage.css";
// import Image from "react-bootstrap/Image";
// import { fetchCategories } from "../../actions/categoriesActions";
// import { fetchQuizzes } from "../../actions/quizzesActions";
// import { jwtDecode } from "jwt-decode"; 

// const AdminProfilePage =  () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const loginReducer = useSelector((state) => state.loginReducer);
//   console.log("loginReducer::inside admin page",loginReducer)
//   const user = loginReducer.user ;
//   const token = localStorage.getItem("jwtToken");

//   useEffect(() => {
//     if (!localStorage.getItem("jwtToken")) navigate("/");
//   }, [navigate]);

//   useEffect(() => {
//     fetchCategories(dispatch, token);
//   }, [dispatch, token]);

//   useEffect(() => {
//     fetchQuizzes(dispatch, token);
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         console.log(decodedToken); // Debugging purpose
//       } catch (error) {
//         console.error("Token decoding error:", error);
//       }
//     }
//   }, [token]);

//   // Debugging useEffect
//   useEffect(() => {
//     console.log("User data:", user);
//   }, [user]);

//   console.log("User in admin Page :::>", user)
//   if (!user) {
//     return <div>Loading...</div>; // or some kind of loading indicator
//   }

//   return (
//     <div className="adminProfilePage__container">
//       <div className="adminProfilePage__sidebar">
//         <Sidebar />
//       </div>
//       <div className="adminProfilePage__content">
//         <Image
//           className="adminProfilePage__content--profilePic"
//           width="20%"
//           height="20%"
//           roundedCircle
//           src="images/user.png"
//         />

//         <Table bordered className="adminProfilePage__content--table">
//           <tbody>
//             <tr>
//               <td>Name</td>
//               <td>{`${user.firstName} ${user.lastName}`}</td>
//             </tr>
//             <tr>
//               <td>Username</td>
//               <td>{user.userName}</td>
//             </tr>
//             <tr>
//               <td>Phone</td>
//               <td>{user.phoneNumber}</td>
//             </tr>
//             <tr>
//               <td>Role</td>
//               <td>{user.roles[0]}</td>
//             </tr>
//             <tr>
//               <td>Status</td>
//               <td>{`${user.active}`}</td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AdminProfilePage;
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./AdminProfilePage.css";
import Image from "react-bootstrap/Image";
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import { jwtDecode } from "jwt-decode";  // Corrected import

const AdminProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (token) {
      fetchCategories(dispatch, token);
      fetchQuizzes(dispatch, token);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Debugging purpose
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, [token]);

  // Debugging useEffect
  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  console.log("User in admin Page :::>", user);
  if (!user) {
    return <div>Loading...</div>; // or some kind of loading indicator
  }

  return (
    <div className="adminProfilePage__container">
      <div className="adminProfilePage__sidebar">
        <Sidebar />
      </div>
      <div className="adminProfilePage__content">
        <Image
          className="adminProfilePage__content--profilePic"
          width="20%"
          height="20%"
          roundedCircle
          src="images/user.png"
        />

        <Table bordered className="adminProfilePage__content--table">
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
              <td>{user.roles[0]}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{`${user.active}`}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProfilePage;
