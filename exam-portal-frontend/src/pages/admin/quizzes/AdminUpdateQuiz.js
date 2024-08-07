
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";
import FormContainer from "../../../components/FormContainer";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { fetchCategories } from "../../../actions/categoriesActions";
import { fetchQuizzes, updateQuiz } from "../../../actions/quizzesActions";

const AdminUpdateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const quizId = params.quizId;

  // Access quizzes from Redux store and ensure it's an array
  const quizzes = useSelector((state) => {
    const quizzesData = state.quizzesReducer.quizzes;
    return Array.isArray(quizzesData) ? quizzesData : quizzesData?.$values || [];
  });

  const oldQuiz = quizzes.find((quiz) => quiz.quizId == quizId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Default to empty string

  useEffect(() => {
    if (oldQuiz) {
      setTitle(oldQuiz.title);
      setDescription(oldQuiz.description);
      setIsActive(oldQuiz.isActive);
      setSelectedCategoryId(oldQuiz.category?.catId || ""); // Default to empty string
    }
  }, [oldQuiz]);

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const onClickPublishedHandler = () => {
    setIsActive(!isActive);
  };

  const onSelectCategoryHandler = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const token = localStorage.getItem("jwtToken");

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedCategoryId !== "" && selectedCategoryId !== "n/a") {
      const quiz = {
        quizId: oldQuiz.quizId, // Ensure this is correctly set
        title: title,
        description: description,
        isActive: isActive,
        categoryId: selectedCategoryId, // Ensure this is correctly set
      };
      const token = localStorage.getItem("jwtToken");
  
      // Correct usage of dispatch in action creator
      dispatch(updateQuiz(quiz, token))
      .then(() => {
        swal("Quiz Updated!", `${title} successfully updated`, "success");
        dispatch(fetchQuizzes(token)); // Make sure fetchQuizzes is a thunk action creator
      })
      .catch(() => {
        swal("Quiz Not Updated!", `${title} not updated`, "error");
      });
    } else {
      alert("Select a valid category!");
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(dispatch, token).then((data) => {
        setCategories(data.payload);
      });
    }
  }, [categories, dispatch, token]);

  if (!oldQuiz) {
    return <div>Loading...</div>; // or handle the case when the quiz is not found
  }

  return (
    <div className="adminUpdateQuizPage__container">
      <div className="adminUpdateQuizPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminUpdateQuizPage__content">
        <FormContainer>
          <h2>Update Quiz</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter Quiz Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Check
              style={{ borderColor: "rgb(68 177 49)" }}
              className="my-3"
              type="switch"
              id="publish-switch"
              label="Publish Quiz"
              onChange={onClickPublishedHandler}
              checked={isActive}
            />

            <div className="my-3">
              <label htmlFor="category-select">Choose a Category:</label>
              <Form.Select
                aria-label="Choose Category"
                id="category-select"
                value={selectedCategoryId} // Ensure value is never null
                onChange={onSelectCategoryHandler}
              >
                <option value="n/a">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat.catId} value={cat.catId}>
                    {cat.title}
                  </option>
                ))}
              </Form.Select>
            </div>
            <Button
              className="my-5 adminUpdateQuizPage__content--button"
              type="submit"
              variant="primary"
            >
              Update
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default AdminUpdateQuiz;