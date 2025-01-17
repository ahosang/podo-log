import React from "react";
import { useRecoilValue } from "recoil";
import Bounce from "react-reveal/Bounce";

import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { selectedColorAtom } from "../recoil/book-color";
import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import DiaryIcon from "src/components/new-book/DiaryIcon";
import ColorSelectContainer from "src/components/new-book/ColorSelectContainer";
import ContainerTitle from "src/components/new-book/ContainerTitle";
import BookTitleInputContainer from "src/components/new-book/BookTitleInputContainer";
import PurpleButton from "src/components/common/PurpleButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface NewBookName {
  bookName: string;
}

const NewBook = () => {
  const navigate = useNavigate();
  const selectedColor = useRecoilValue(selectedColorAtom);
  const { register, handleSubmit } = useForm<NewBookName>({ mode: "onSubmit" });

  const createNewDiary = async ({ bookName }: NewBookName) => {
    try {
      await api.post(API_URL.books, { color: selectedColor, bookName });
      navigate(-1);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 만들기" />
      <Bounce duration={1500}>
        <form onSubmit={handleSubmit(createNewDiary)}>
          <DiaryIcon />
          <ContainerTitle>표지 색상 선택</ContainerTitle>
          <ColorSelectContainer />
          <ContainerTitle>일기장 제목</ContainerTitle>
          <BookTitleInputContainer register={register("bookName")} />
          <PurpleButton description="생성하기" wrapperStyle="mt-[5vh]" buttonStyle="sm:w-40" />
        </form>
      </Bounce>
    </PinkPurpleBackground>
  );
};

export default NewBook;
