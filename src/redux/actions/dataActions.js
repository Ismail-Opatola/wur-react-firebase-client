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
      console.log('GET QUESTIONS ERROR:', err)
    });
};

export const getQuestion = (questionId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/question/${questionId}`)
    .then((res) => {
      dispatch({
        type: SET_QUESTION,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const postVote = (questionId, vote) => (dispatch) => {
  axios
    .post(`/question/${questionId}`, vote)
    .then((res) => {
      dispatch({
        type: SET_ERRORS,
        payload: res.data
      });
    }).then(() => {
      getQuestion(questionId)
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
