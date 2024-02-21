import { useDrag } from "react-dnd";
import Sigil from "../Sigil/Sigil";

const SigilOption = ({ sigil, index, onSigilClick }) => {
  const handleSigilClick = () => {
    onSigilClick( sigil);
  };
  const [{ isDragging }, drag] = useDrag({
    type: "sigil",
    item: { sigil },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Sigil
      {...sigil} // TODO: Default to max or base level
      innerRef={drag}
      style={{
        backgroundColor: "lightgray",
        width: "50px",
        height: "50px",
        margin: "5px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      onSigilClick={handleSigilClick}
    ></Sigil>
  );
};

export default SigilOption;
