import noImg from "../../images/no-img.png";

import {
  SET_QUESTIONS,
  SET_SINGLE_USER_QUESTIONS,
  SET_QUESTION,
  UPDATE_AUTHOR_IMG,
  POST_QUESTION,
  LOADING_DATA,
  STOP_LOADING_DATA,
  DELETE_QUESTION,
  POST_VOTE,
  POST_VOTE_FROM_USER_PAGE,
  SET_LEADERBOARD
} from "../action-types";

const initialState = {
  questions: {
    answered: [],
    unanswered: []
  },
  singleUserQuestions: [],
  question: {
    question: {},
    votersPercentage: {},
    votersPhotoList: [],
    votersRatio: {},
    yourVote: {}
  },
  leaderboard: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: { ...state.questions, ...action.payload },
        loading: false
      };
    case SET_SINGLE_USER_QUESTIONS:
      return {
        ...state,
        singleUserQuestions: action.payload,
        loading: false
      };
    case SET_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    case SET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload,
        loading: false
      };
    case UPDATE_AUTHOR_IMG:
      state.questions.answered.filter((data, index) => {
        if (data.authorId === action.payload.credentials.userId) {
          data.authorImg = action.payload.credentials.imageUrl;
          // state.questions.answered.splice(index, 1);
          return data;
        }
        return false;
      });
      state.questions.unanswered.filter((data, index) => {
        if (data.authorId === action.payload.credentials.userId) {
          data.authorImg = action.payload.credentials.imageUrl;
          // state.questions.unanswered.splice(index, 1);
          return data;
        }
        return false;
      });
      return {
        ...state,
        questions: {
          answered: [...state.questions.answered],
          unanswered: [...state.questions.unanswered]
        }
      };
    case POST_VOTE:
      let newUnanswered = state.questions.unanswered.filter(
        question => question.questionId !== action.payload.questionId // change this to action.payload.questionId
      );

      return {
        ...state,
        questions: {
          answered: state.questions.answered.concat(action.payload), //action.payload
          unanswered: newUnanswered
        }
      };
    case POST_VOTE_FROM_USER_PAGE:
      let newUnans = state.questions.unanswered.filter(
        question => question.questionId !== action.payload.questionId
      );
      let questionIndex = state.singleUserQuestions.findIndex(
        question => question.questionId === action.payload.questionId
      );
      state.singleUserQuestions[questionIndex] = action.payload;
      return {
        ...state,
        questions: {
          answered: state.questions.answered.concat(action.payload), //action.payload
          unanswered: newUnans
        },
        singleUserQuestions: [...state.singleUserQuestions]
      };
    case DELETE_QUESTION:
      // TODO: IF MUTATION, NEST UPDATE
      let index1, index2;

      index1 = state.questions.unanswered.findIndex(
        question => question.questionId === action.payload
      );
      index2 = state.questions.answered.findIndex(
        question => question.questionId === action.payload
      );

      if (index1 !== -1) {
        state.questions.unanswered.splice(index1, 1);
      }

      if (index2 !== -1) {
        state.questions.answered.splice(index2, 1);
      }

      return {
        ...state,
        questions: {
          answered: [...state.questions.answered],
          unanswered: [...state.questions.unanswered]
        }
      };
    case POST_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          unanswered: [action.payload, ...state.questions.unanswered]
        }
      };

    default:
      return state;
  }
}

//   case POST_VOTE:
//         let index = state.questions.unanswered.findIndex(
//           (question) => question.questionId === action.payload.questionId
//         );
//         state.questions[index] = action.payload;

//         // update to single question in the store... see (questionDialog)
//         if (state.question.questionId === action.payload.questionId) {
//           state.question = action.payload;
//         }
//         return {
//           ...state
//         };

// case POST_VOTE:
//         let newUnanswered = state.questions.unanswered.filter(
//           (question) => question.questionId !== action.payload.questionId
//         );

//         state.questions.unanswered = newUnanswered;

//         state.questions.answered.concat(action.payload);

//         // update to single question in the store... see (questionDialog)
//         if (state.question.questionId === action.payload.questionId) {
//           state.question = action.payload;
//         }
//         return {
//           ...state
//         };
