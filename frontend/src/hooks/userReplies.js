import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReply as _createReply,
  fetchReplies,
  repliesSelector,
} from "../redux/replies";

function useReplies(commentId) {
  const dispatch = useDispatch();
  const replies = useSelector(repliesSelector);

  useEffect(() => {
    dispatch(fetchReplies(commentId));
  }, [dispatch, commentId]);

  const createReply = (userId, commentId, content) =>
    dispatch(_createReply(userId, commentId, content));

  return { replies, createReply };
}

export default useReplies;
