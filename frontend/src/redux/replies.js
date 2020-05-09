import { call, put, takeLatest } from "redux-saga/effects";
import * as RepliesService from "../services/replies";

export const actionTypes = {
  FETCH_REPLIES: `replies/FETCH_REPLIES`,
  FETCH_REPLIES_SUCCESS: `replies/FETCH_REPLIES_SUCCESS`,
  FETCH_REPLIES_FAILURE: `replies/FETCH_REPLIES_FAILURE`,
  CREATE_REPLY: `replies/CREATE_REPLY`,
};

export function fetchReplies(commentId) {
  return {
    type: actionTypes.FETCH_REPLIES,
    payload: {
      commentId,
    },
  };
}

export function fetchRepliesSuccess(replies) {
  return {
    type: actionTypes.FETCH_REPLIES_SUCCESS,
    payload: replies,
  };
}

export function fetchRepliesFailure(error) {
  return {
    type: actionTypes.FETCH_REPLIES_FAILURE,
    payload: error,
    error: true,
  };
}

export function createReply(userId, commentId, content) {
  return {
    type: actionTypes.CREATE_REPLY,
    payload: {
      userId,
      commentId,
      content,
    },
  };
}

const initialState = {
  isFetching: false,
  replies: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_REPLIES:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_REPLIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        replies: action.payload,
      };
    case actionTypes.FETCH_REPLIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

function* fetchRepliesSagaWorker(action) {
  const { commentId } = action.payload;
  try {
    const replies = yield call(RepliesService.getReplies, commentId);
    yield put(fetchRepliesSuccess(replies));
  } catch (e) {
    yield put(fetchRepliesFailure(e));
  }
}

function* createRepliesSagaWorker(action) {
  const { userId, commentId, content } = action.payload;
  yield call(RepliesService.createReply, userId, commentId, content);
  yield put(fetchReplies(commentId));
}

export function* repliesSagaWatcher() {
  yield takeLatest(actionTypes.FETCH_REPLIES, fetchRepliesSagaWorker);
  yield takeLatest(actionTypes.CREATE_REPLY, createRepliesSagaWorker);
}

export function repliesSelector(state) {
  return state.replies.replies;
}
