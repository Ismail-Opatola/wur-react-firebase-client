import {
  LOADING_DATA,
  SET_QUESTIONS,
  SET_QUESTION,
  SET_SINGLE_USER_QUESTIONS,
  POST_VOTE,
  POST_QUESTION,
  DELETE_QUESTION,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  LOADING_UI,
  SET_LEADERBOARD,
  POST_VOTE_FROM_USER_PAGE,
  STOP_LOADING_DATA
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
  axios
    .get(`/question/${questionId}`)
    .then(res => {
      dispatch({
        type: SET_QUESTION,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const deleteQuestion = questionId => async dispatch => {
  try {
    dispatch({ type: LOADING_UI });
    dispatch({ type: DELETE_QUESTION, payload: questionId });
    await axios.delete(`/question/${questionId}`);
  } catch (err) {
    console.log(err);
  } finally {
    // dispatch({ type: DELETE_QUESTION, payload: questionId });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const postVote = (questionId, vote) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/question/${questionId}`, vote)
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: { message: "captured successsfully" }
      });
      dispatch({
        type: POST_VOTE,
        payload: res.data
      });
      return axios.get(`/question/${questionId}`);
    })
    .then(res => {
      dispatch({
        type: SET_QUESTION,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
      if (err.response.data !== "undefined") {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      }
      dispatch({ type: STOP_LOADING_UI });
    });
};
export const postVoteFromUserPage = (questionId, vote) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/question/${questionId}`, vote)
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: { message: "captured successsfully" }
      });
      dispatch({
        type: POST_VOTE_FROM_USER_PAGE,
        payload: res.data
      });
      return axios.get(`/question/${questionId}`);
      // @returns more data for a single question
    })
    .then(res => {
      dispatch({
        type: SET_QUESTION,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
      if (err.response.data !== "undefined") {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      }
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const postQuestion = newQuestion => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/question", newQuestion)
    .then(res => {
      dispatch({
        type: POST_QUESTION,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: STOP_LOADING_UI });
    });
};

// Cancel Request if a subsequent request is made
// https://github.com/axios/axios/issues/1361
const makeRequestCreator = () => {
  let call;
  return url => {
    if (call) {
      call.cancel("Only one request allowed at a time.");
    }
    call = axios.CancelToken.source();
    return axios.get(url, {
      cancelToken: call.token
    });
  };
};
const get = makeRequestCreator();

// Then you can do:

// @ fetch other user questions
export const getUserData = userId => async dispatch => {
  try {
    dispatch({ type: LOADING_DATA });

    const res = await get(`/user/${userId}`); // returns profile data + questions data
    dispatch({
      type: SET_SINGLE_USER_QUESTIONS,
      payload: res.data.questions
    });
    // set only questions data, we already fetched & saved profile to component state not redux store...see user_component
    dispatch(clearErrors());
  } catch (err) {
    if (axios.isCancel(err)) {
      console.error(`Cancelling previous request: ${err.message}`);
    } else {
      dispatch({
        type: SET_SINGLE_USER_QUESTIONS,
        payload: null
      });
    }
  }
};

// export const getUserData = userId => dispatch => {
//   dispatch({ type: LOADING_DATA });
//   axios
//     .get(`/user/${userId}`) // returns profile data + questions data
//     .then(res => {
//       dispatch({
//         type: SET_SINGLE_USER_QUESTIONS,
//         payload: res.data.questions
//       });
//       // set only questions data, w already fetched & saved profile to component state not redux store...see user_component
//       dispatch(clearErrors());
//     })
//     .catch(() => {
//       dispatch({
//         type: SET_SINGLE_USER_QUESTIONS,
//         payload: null
//       });
//     });
// };

// fetch leaderboard data
export const getLeaderBoard = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/leaderboard")
    .then(res => {
      dispatch({
        type: SET_LEADERBOARD,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: { error: "Network Error, Try again!" }
      });
      dispatch({ type: STOP_LOADING_DATA });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
