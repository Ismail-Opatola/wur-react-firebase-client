import noImg from "../../images/no-img.png";

import {
  SET_QUESTIONS,
  SET_SINGLE_USER_QUESTIONS,
  SET_QUESTION,
  POST_QUESTION,
  LOADING_DATA,
  DELETE_QUESTION,
  POST_VOTE,
  SET_LEADERBOARD
} from "../action-types";

const initialState = {
  questions: {
    answered: [],
    unanswered: [
      {
        optionTwo: {
          text: "Deontay Wilder",
          votes: ["zJHC3D4MMiQFSpnUczv2gU8AYKC3"]
        },
        authorImg: noImg,
        questionId: "ZLzRMiTiAYYm4x9Vcc87",
        createdAt: "2019-06-24T07:17:48.744Z",
        optionOne: {
          text: "Tyson Fury",
          votes: ["8dwgRiiX0EQj0PcSO99ZSgJ8tRo1"]
        },
        author: "mark tyson",
        authorId: "bf0Xsc5TAQYtwRkPGSk6E56BxvY2"
      },
      {
        authorImg: noImg,
        questionId: "xpsgQsNwhuh4k0lUNCkN",
        createdAt: "2019-06-24T07:17:13.455Z",
        optionOne: {
          text: "Anthony Joshua",
          votes: []
        },
        author: "mark tyson",
        authorId: "bf0Xsc5TAQYtwRkPGSk6E56BxvY2",
        optionTwo: {
          text: "Deontay Wilder",
          votes: []
        }
      },
      {
        optionOne: {
          text: "Money",
          votes: []
        },
        author: "mark tyson",
        authorId: "bf0Xsc5TAQYtwRkPGSk6E56BxvY2",
        optionTwo: {
          text: "Power",
          votes: []
        },
        authorImg: noImg,
        questionId: "hu4lSOEht63uKzZSNAft",
        createdAt: "2019-06-24T07:14:42.885Z"
      },
      {
        author: "kan Humi",
        authorId: "zJHC3D4MMiQFSpnUczv2gU8AYKC3",
        optionTwo: {
          text: "Modzilla Firefox",
          votes: ["bf0Xsc5TAQYtwRkPGSk6E56BxvY2"]
        },
        authorImg: noImg,
        questionId: "t6kzipMmsruB1hl4ZO2e",
        createdAt: "2019-06-24T07:08:56.831Z",
        optionOne: {
          text: "Google Chrome",
          votes: ["8dwgRiiX0EQj0PcSO99ZSgJ8tRo1"]
        }
      },
      {
        optionOne: {
          text: "NASA",
          votes: ["8dwgRiiX0EQj0PcSO99ZSgJ8tRo1"]
        },
        author: "kan Humi",
        authorId: "zJHC3D4MMiQFSpnUczv2gU8AYKC3",
        optionTwo: {
          text: "ESA",
          votes: []
        },
        authorImg: noImg,
        questionId: "evnsIHZe4HkAVqzyYWxN",
        createdAt: "2019-06-24T07:07:47.500Z"
      },
      {
        authorImg: noImg,
        questionId: "3LcqgN46swOhqMoYv2nH",
        createdAt: "2019-06-24T07:06:25.752Z",
        optionOne: {
          text: "Space Exploration",
          votes: ["8dwgRiiX0EQj0PcSO99ZSgJ8tRo1"]
        },
        author: "kan Humi",
        authorId: "zJHC3D4MMiQFSpnUczv2gU8AYKC3",
        optionTwo: {
          text: "Deep Sea Exploration",
          votes: []
        }
      },
      {
        optionTwo: {
          text: "Jason Bourne",
          votes: [
            "bf0Xsc5TAQYtwRkPGSk6E56BxvY2",
            "zJHC3D4MMiQFSpnUczv2gU8AYKC3"
          ]
        },
        authorImg: noImg,
        questionId: "frX6c4u24J2XBMhROBY8",
        createdAt: "2019-06-24T07:04:02.126Z",
        optionOne: {
          text: "Evelyn Salt",
          votes: []
        },
        author: "vito ranold",
        authorId: "8dwgRiiX0EQj0PcSO99ZSgJ8tRo1"
      },
      {
        optionOne: {
          text: "KungFu Pao",
          votes: []
        },
        author: "vito ranold",
        authorId: "8dwgRiiX0EQj0PcSO99ZSgJ8tRo1",
        optionTwo: {
          text: "Drunken Master",
          votes: []
        },
        authorImg: noImg,
        questionId: "mwcHIdwwnLWTsUA6UxWV",
        createdAt: "2019-06-24T07:00:11.930Z"
      },
      {
        authorImg: noImg,
        questionId: "Rj6kT5sutKTY95gTRep3",
        createdAt: "2019-06-24T06:59:03.392Z",
        optionOne: {
          text: "Avenger Endgame",
          votes: []
        },
        author: "vito ranold",
        authorId: "8dwgRiiX0EQj0PcSO99ZSgJ8tRo1",
        optionTwo: {
          text: "Game of Thrones",
          votes: []
        }
      }
    ]
  },
  question: {
    question: {},
    votersPercentage: {},
    votersPhotoList: [],
    votersRatio: {},
    yourVote: {}
  },
  leaderboard: [
    {
      userId: "zJHC3D4MMiQFSpnUczv2gU8AYKC3",
      username: "kan Humi",
      imageUrl: noImg,
      created: 4,
      answered: 7,
      score: 11,
      position: 0
    },
    {
      userId: "8dwgRiiX0EQj0PcSO99ZSgJ8tRo1",
      username: "vito ranold",
      imageUrl: noImg,
      created: 3,
      answered: 7,
      score: 10,
      position: 1
    },
    {
      userId: "bf0Xsc5TAQYtwRkPGSk6E56BxvY2",
      username: "mark tyson",
      imageUrl: noImg,
      created: 3,
      answered: 3,
      score: 6,
      position: 2
    },
    {
      userId: "hYWgcR3FEea76lA5CQ5ajS66XZw2",
      username: "Charles Monte",
      imageUrl: noImg,
      created: 1,
      answered: 1,
      score: 2,
      position: 3
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
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
        questions: {
          answered: [],
          unanswered: action.payload
        },
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
        leaderboard: action.payload
      };
    case POST_VOTE:
      let newUnanswered = state.questions.unanswered.filter(
        question => question.questionId !== action.payload.questionId // change this to action.payload.questionId
      );

      return {
        ...state,
        questions: {
          answred: state.questions.answered.concat(action.payload), //action.payload
          unanswered: newUnanswered
        }
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
