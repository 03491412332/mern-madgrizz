import "../assets/scss/FormRowSelect.scss";
import { Field } from "formik";
const FormRowSelect = ({
  label = "Select label",
  list,
  name,
  isApiData = false,
}) => {
  return (
    <div className="selectWrapper">
      <label htmlFor="standard-select" className="mySelectLabel">
        {label}
      </label>
      <div className="select">
        <Field as="select" name={name} id="standard-select">
          <option value="">{`Please select ${label}`}</option>

          {list?.map((item, i) => {
            return (
              <option
                value={isApiData ? (item.name ? item._id : item.title) : item}
                key={isApiData ? item._id : i}
              >
                {isApiData ? (item.name ? item.name : item.title) : item}
              </option>
            );
          })}
        </Field>
        <span className="focus"></span>
      </div>
    </div>
  );
};

export default FormRowSelect;
