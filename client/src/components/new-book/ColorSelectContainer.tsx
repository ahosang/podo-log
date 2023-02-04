import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState, useResetRecoilState } from "recoil";

import { selectedColorAtom } from "../../recoil/new-book";
import { DIARY_COLOR } from "src/constants/DIARY_COLOR";

const renderColorSelectButtons = () => {
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorAtom);

  const colorSelectButtons = DIARY_COLOR.map((color) => {
    const isSelected = color === selectedColor;
    const borderStyle = isSelected ? "border-white border-dashed border-[6px]" : "border-none";
    return (
      <ColorSelectButton
        key={color}
        id={color}
        className={`bg-[#${color}] ${borderStyle}`}
        onClick={() => setSelectedColor(color)}
      />
    );
  });

  return colorSelectButtons;
};

const ColorSelectContainer = () => {
  const resetSelectedColor = useResetRecoilState(selectedColorAtom);

  useEffect(() => {
    return () => {
      resetSelectedColor();
    };
  }, []);

  return (
    <div className="grid grid-cols-6 mt-[1.5vh] px-[5vw]">{renderColorSelectButtons()}</div>
  );
};

export default ColorSelectContainer;

const ColorSelectButton = tw.div`
md:w-[65px] w-[35px] md:h-[65px] h-[35px] rounded-full m-auto mb-[2vh] cursor-pointer
`;
