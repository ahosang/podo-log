import React from "react";
import { useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import Fade from "react-reveal/Fade";

import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { getComments } from "src/recoil/diary-detail";
import { Input, InputContainer } from "../common/Input";

interface CommentInput {
  readonly comment: string;
}

export interface NewCommentProps {
  parentNickname?: string;
  commentId: number;
  comment: string;
  cancelEdit: () => void;
}

export const EditComment = ({
  parentNickname,
  commentId,
  comment,
  cancelEdit,
}: NewCommentProps) => {
  const reloadComments = useSetRecoilState(getComments);
  const { register, handleSubmit } = useForm<CommentInput>({
    defaultValues: { comment: comment },
  });

  const onSubmitComment = async ({ comment }: CommentInput) => {
    try {
      await api.patch(API_URL.comments + `/${commentId}`, { reply: comment });
      reloadComments(1);
      cancelEdit();
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <Fade>
      <>
        {parentNickname && (
          <div className="flex text-[1.5vh] min-[390px]:text-[1.3vh]">
            <div className="font-sans font-bold">{parentNickname}</div>
            <div className="font-sans">님에게 답글 남기는중</div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmitComment)}>
          <InputContainer className="flex-row w-full mt-0 shadow-lg">
            <Input
              className="font-sans w-[90%]"
              placeholder="댓글을 입력해주세요. (최대 150자)"
              minLength={1}
              maxLength={150}
              required
              {...register("comment")}
            />
            <CancelButton onClick={cancelEdit}>취소</CancelButton>
            <PostButton>수정</PostButton>
          </InputContainer>
        </form>
      </>
    </Fade>
  );
};

const CancelButton = tw.p` 
font-sans w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-grat-1000 hover:opacity-50 ease-in duration-300
`;

const PostButton = tw.button` 
font-sans w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-purple-1000 hover:opacity-50 ease-in duration-300
`;
