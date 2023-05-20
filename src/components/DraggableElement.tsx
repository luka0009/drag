import React, { useState, useEffect, MouseEvent, ReactNode, useContext } from "react";
import "./DraggableElement.css";
import Any from "./Any";
import Box from "./Box";
import generateRandomColor from "../utils/colors";
import { EditContext } from "../context/EditContext";

interface Position {
  x: number;
  y: number;
}

interface Props {
  initialPos?: Position;
  children?: ReactNode;
}

const Draggable = ({ initialPos, children }: Props) => {
  const [pos, setPos] = useState<Position>(initialPos || { x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [rel, setRel] = useState<Position | null>(null);
  const [childCount, setChildCount] = useState(0);
  const [transform, setTransform] = useState(false);
  const [childColor] = useState(generateRandomColor());
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent<Document>) => {
      if (!dragging) return;
      setPos({
        x: e.pageX - (rel as Position).x,
        y: e.pageY - (rel as Position).y,
      });
      e.stopPropagation();
      e.preventDefault();
    };

    const onMouseUp = (e: MouseEvent<Document>) => {
      setDragging(false);
      e.stopPropagation();
      e.preventDefault();
    };

    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  function onMouseDown(e: MouseEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    const element = e.currentTarget;
    const { left, top } = element.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.pageX - left,
      y: e.pageY - top,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  useEffect(() => {
    if (childCount === 0) {
      setTransform(false);
    } else if (childCount >= 3) {
      setTransform(true);
    }
  }, [childCount]);

  return (
    <>
      <div
        className="my-draggable"
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          left: `${pos.x}px`,
          top: `${pos.y}px`,
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
          {[...Array(childCount)].map((item, idx) => {
            return (
              // <Any key={idx} />
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
    </>
  );
};

export default Draggable;
