import "../assets/scss/CheckBox.scss";
const CheckBox = ({
  text,
  classes,
  value,
  name,
  id,
  handleChange,
  ChangeCheckedValue,
  isDefaultChecked,
  refed,
}) => {
  //console.log("handle change value in prop", handleChange);
  //console.log(`Default checked value of ${text} in prop`, isDefaultChecked);
  return (
    <>
      <label className={`cyberpunk-checkbox-label ${classes}`}>
        <input
          className="cyberpunk-checkbox"
          id={id}
          type="checkbox"
          value={value}
          name={name}
          onChange={handleChange}
          checked={isDefaultChecked}
          defaultChecked={isDefaultChecked}
          ref={refed}
        />
        {text}
      </label>
    </>
  );
};

export default CheckBox;
