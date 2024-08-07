import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/authActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginReducer = useSelector((state) => state.loginReducer);

  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else if (loginReducer.user) {
      setUser(loginReducer.user);
    }
  }, [loginReducer]);

  const logoutHandler = () => {
    dispatch(logout());
    setUser({});
    navigate("/login");
  };

  const isLoggedIn = !!user.firstName;

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>Exam-Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {isLoggedIn ? (
                <Nav.Link>{user.firstName}</Nav.Link>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              {isLoggedIn ? (
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              ) : (
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.loginReducer.user);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setIsLoggedIn(true);
//     }
//   }, []); // Empty dependency array ensures this runs only on mount

//   useEffect(() => {
//     if (user) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [user]); // Dependency on user to update isLoggedIn when user changes

//   const logoutHandler = () => {
//     setIsLoggedIn(false);
//     localStorage.clear();
//     navigate("/login");
//   };

//   useEffect(() => {
//     console.log("User data in Header:", user);
//   }, [user]);

//   if (user === null || user === undefined) {
//     return <div>Loading...</div>; // or return a loading spinner/component
//   }

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
//         <Container>
//           <Navbar.Brand>Exam-Portal</Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="justify-content-end flex-grow-1 pe-3">
//               {isLoggedIn ? (
//                 <>
//                   <Nav.Link>{user.firstName}</Nav.Link>
//                   <LinkContainer to="/">
//                     <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
//                   </LinkContainer>
//                 </>
//               ) : (
//                 <>
//                   <LinkContainer to="/">
//                     <Nav.Link>Login</Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to="/register">
//                     <Nav.Link>Register</Nav.Link>
//                   </LinkContainer>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
