import {
  LOADING_DATA,
  SET_QUESTIONS,
  SET_QUESTION,
  POST_VOTE,
  POST_QUESTION,
  DELETE_QUESTION,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  LOADING_UI
} from "../action-types";
import axios from "axios";

// Get all Questions
export const getQuestions = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/questions")
    .then(res => {
      dispatch({
        type: SET_QUESTIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_QUESTIONS,
        payload: []
      });
      console.log("GET QUESTIONS ERROR:", err);
    });
};

export const getQuestion = questionId => dispatch => {
  dispatch({ type: LOADING_UI });
  console.log("run getQuestion");
  axios
    .get(`/question/${questionId}`)
    .then(res => {
      dispatch({
        type: SET_QUESTION,
        payload: res.data
      });
      console.log("just ran getQuestion");
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const deleteQuestion = questionId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/question/${questionId}`)
    .then(res => {
      console.log({ "deleted from server": res.data });
      dispatch({ type: DELETE_QUESTION, payload: questionId });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const postVote = (questionId, vote) => dispatch => {
  axios
    .post(`/question/${questionId}`, vote)
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: res.data
      });
    })
    .then(() => {
      dispatch({
        type: POST_VOTE,
        payload: questionId
      });
      console.log("calling getQuestion from postVote");
      return getQuestion(questionId);
    })
    .then(() => {
      dispatch(clearErrors());
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
