import "../assets/scss/CheckBox.scss";
const CheckBox = ({ text, classes }) => {
  return (
    <>
      <label className={`cyberpunk-checkbox-label ${classes}`}>
        <input className="cyberpunk-checkbox" type="checkbox" />
        {text}
      </label>
    </>
  );
};

export default CheckBox;
