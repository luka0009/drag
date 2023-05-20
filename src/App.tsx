import { useEffect, useState } from "react";
import "./App.css";
import Any from "./components/Any";
import DraggableElement from "./components/DraggableElement";
import { EditContext } from "./context/EditContext";

function App() {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    console.log(edit);
  }, [edit]);
  return (
    <>
      <EditContext.Provider value={{edit, setEdit}}>
        <div>
          <DraggableElement initialPos={{ x: 0, y: 0 }} children={<Any />} />
        </div>
      </EditContext.Provider>
    </>
  );
}

export default App;
