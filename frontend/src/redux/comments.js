import { call, put, takeLatest } from "redux-saga/effects";

import * as CommentsService from "../services/comments";

export const actionTypes = {
  FETCH_COMMENTS: `comments/FETCH_COMMENTS`,
  FETCH_COMMENTS_SUCCESS: `comments/FETCH_COMMENTS_SUCCESS`,
  FETCH_COMMENTS_FAILURE: `comments/FETCH_COMMENTS_FAILURE`,
  CREATE_COMMENT: `comments/CREATE_COMMENT`,
};

export function fetchComments() {
  return {
    type: actionTypes.FETCH_COMMENTS,
  };
}

export function fetchCommentsSuccess(comments) {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    payload: comments,
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILURE,
    payload: error,
    error: true,
  };
}

export function createComment(userId, content) {
  return {
    type: actionTypes.CREATE_COMMENT,
    payload: {
      userId,
      content,
    },
  };
}

const initialState = {
  isFetching: false,
  comments: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: action.payload,
      };
    case actionTypes.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

function* fetchCommentsSagaWorker() {
  try {
    const comments = yield call(CommentsService.getComments);
    yield put(fetchCommentsSuccess(comments));
  } catch (e) {
    yield put(fetchCommentsFailure(e));
  }
}

function* createCommentSagaWorker(action) {
  const { userId, content } = action.payload;
  yield call(CommentsService.createComment, userId, content);
  yield call(fetchCommentsSagaWorker);
}

export function* commentsSagaWatcher() {
  yield takeLatest(actionTypes.FETCH_COMMENTS, fetchCommentsSagaWorker);
  yield takeLatest(actionTypes.CREATE_COMMENT, createCommentSagaWorker);
}

export function commentsSelector(state) {
  return state.comments.comments;
}
