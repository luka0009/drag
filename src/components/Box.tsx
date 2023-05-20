import { useEffect, useState } from "react";
import Any from "./Any";
import "./DraggableElement.css";
import generateRandomColor from "../utils/colors";

const Box = ({ onMouseDown, children, color }: any) => {
  const [childCount, setChildCount] = useState(0);
  const [transform, setTransform] = useState(false);
  const [childColor] = useState(generateRandomColor());

  useEffect(() => {
    if (childCount === 0) {
      setTransform(false);
    } else if (childCount >= 3) {
      setTransform(true);
    }
  }, [childCount]);

  return (
    <div>
      <div
        className="my-draggable"
        onMouseDown={onMouseDown}
        style={{
          background: color,
        //   margin: `${
        //     childCount === 0
        //       ? "0px"
        //       : childCount > 1
        //       ? "0px 100px"
        //       : childCount > 2
        //       ? "0px 120px"
        //       : "0px 130px"
        //   }`,
        }}
      >
        {children}
        <div className="buttons">
          <button
            className="button"
            onClick={() => setChildCount((prevNum) => prevNum + 1)}
          >
            +
          </button>
          <button
            className="button"
            onClick={() => {
              if (childCount > 0) {
                setChildCount((prevNum) => prevNum - 1);
              }
            }}
          >
            -
          </button>
        </div>
        <div
          className="child"
          style={{
            transform: `${transform ? "translate(-50%)" : "translate(-35%)"}`,
            gap: `${childCount * 60}px`,
          }}
        >
          {[...Array(childCount)].map((_item, idx) => {
            return (
              <Box
                key={idx}
                color={childColor}
                onMouseDown={onMouseDown}
                children={<Any />}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Box;
