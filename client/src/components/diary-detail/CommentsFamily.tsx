import React, { useState } from "react";

import { DiaryId } from "../../pages/DiaryDetail";
import { Comment, CommentReply } from "./Comment";
import { ReplyComment } from "./ReplyComment";
import { CommentFamType } from "./CommentSection";

interface CommentsFamilyProps extends DiaryId {
  commentsFam: CommentFamType;
}

export const CommentsFamily = ({ diaryId, commentsFam }: CommentsFamilyProps) => {
  const [isReplyWritingEnabled, setIsReplyWritingEnabled] = useState(false);
  const changeReplyState = () => {
    setIsReplyWritingEnabled((prev) => !prev);
  };

  return (
    <React.Fragment key={commentsFam.parentComment?.commentId}>
      <Comment data={commentsFam.parentComment} changeReplyState={changeReplyState} />
      {commentsFam.reComments?.map((recomment) => {
        return (
          <CommentReply
            parentNickname={commentsFam.parentComment.nickname}
            data={recomment}
            key={recomment.commentId}
          />
        );
      })}
      {isReplyWritingEnabled && (
        <ReplyComment
          diaryId={diaryId}
          parentNickname={commentsFam.parentComment.nickname}
          parentCommentId={commentsFam.parentComment.commentId}
        />
      )}
    </React.Fragment>
  );
};