import Sigil from "./Sigil/Sigil";

const SigilList = ({ sigils }) => {
  const renderedSigils = sigils.map((sigil) => {
    return (
      <Sigil
        name={sigil.Name}
        trait={sigil.Trait}
        effect={sigil['Sigil Effect']}
      ></Sigil>
    );
  });

  return <ul>{renderedSigils};</ul>;
};

export default SigilList;