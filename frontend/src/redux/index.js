import { combineReducers } from "redux";

import * as UsersStore from "./users";
import * as CommentsStore from "./comments";
import * as RepliesStore from "./replies";

export const reducer = combineReducers({
  replies: RepliesStore.reducer,
  comments: CommentsStore.reducer,
  users: UsersStore.reducer,
});

export const sagas = [
  RepliesStore.repliesSagaWatcher,
  CommentsStore.commentsSagaWatcher,
  UsersStore.usersSagaWatcher,
];
