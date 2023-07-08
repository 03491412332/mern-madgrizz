import Select from "react-select";
const CustomSelect = ({
  field,
  form,
  options,
  isMulti = false,
  placeholder = "Select",
}) => {
  function onChange(option) {
    form.setFieldValue(
      field.name,
      option ? option.map((item) => item.value) : []
    );
  }

  const getValue = () => {
    if (options) {
      return options.find((option) => option.value === field.value);
    } else {
      return "";
    }
  };
  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isMulti={true}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
