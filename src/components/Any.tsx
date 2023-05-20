import React, { useState } from "react";

const Any: React.FC = () => {
  // const { edit, setEdit } = useContext(EditContext);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("Drag");

  const handleDoubleClick = () => {
    setEdit(true);
  };

  const handleBlur = () => {
    setEdit(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setEdit(false);
    }
  };

  return (
    <div>
      {!edit ? (
        <span
          style={{ color: "white" }}
          onDoubleClick={handleDoubleClick}
          onClick={handleDoubleClick}
        >
          {text}
        </span>
      ) : (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
    </div>
  );
};

export default Any;
