import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  POST_QUESTION,
  POST_VOTE,
  DELETE_QUESTION,
  MARK_NOTIFICATIONS_READ
} from "../action-types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
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
    case POST_QUESTION:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          questions: state.credentials.questions.concat(
            action.payload.questionId
          ),
          score: state.credentials.score + 1
        }
      };
    case POST_VOTE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          votes: state.credentials.votes.concat(action.payload),
          score: state.credentials.score + 1
        }
      };
    case DELETE_QUESTION:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          questions: state.credentials.questions.filter(
            questionId => questionId !== action.payload.questionId
          ),
          score: state.credentials.score - 1
        }
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
