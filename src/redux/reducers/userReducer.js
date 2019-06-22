import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_QUESTION,
  ANSWER_QUESTION,
  DELETE_QUESTION,
  MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  votes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case SET_QUESTION:
      return {
        ...state,
        question: [
          ...state.votes,
            action.payload.questionId
        ],
        score: state.score + 1
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        votes: [
          ...state.votes,
            action.payload.questionId
        ],
        score: state.score + 1
      };
    case DELETE_QUESTION:
      return {
        ...state,
        votes: state.votes.filter(vote => vote === action.payload.questionId ),
        score: state.score - 1
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
