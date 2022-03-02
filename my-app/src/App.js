import dynamicFormJson from "./fields.json";
import { useState, useEffect } from "react";
import Element from "./components/Element";
import { FormContext } from "./FormContext";

function App() {
  const [elements, setElements] = useState(null);
  const [fieldsRequired, setFieldsRequired] = useState("");
  useEffect(() => {
    setElements(dynamicFormJson[0]);
  }, []);

  const { fields, page_label } = elements ?? {};
  const handleSubmit = (event) => {
    let count = 0;
    let countMandatory = 0;
    event.preventDefault();

    elements.fields.forEach((field) => {
      if (field["field_mandatory"]) {
        field["field_mandatory"] =
          field["field_value"].length > 0 && field["error_msg"].length === 0 ? false : true;
        if (field["field_mandatory"]) field["field_mandatory_active"] = true;
        else if (!field["field_mandatory"] && field["error_msg"].length === 0) {
          field["field_mandatory_active"] = false;
          count++;
        }
        setFieldsRequired(field);
      }
    });

    elements.fields.forEach((field) => {
      if (field["field_mandatory"]) countMandatory++;
    });

    if (count === countMandatory) {
      alert("Saved successfully!!");
      console.log("elements saved by handleSubmit", elements);
    }
  };

  const handleChange = (id, event, text) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { data_type, uid } = field;

      if (id === uid) {
        field["field_value"] = event.target
          ? event.target.value
          : !text.props
          ? ""
          : text.props.children.props
          ? localStorage.getItem("lastTextEditor")
          : text.props.children;
        if (!event.target && !text.props.children.props && text.props.children)
          localStorage.setItem("lastTextEditor", text.props.children);

        if (id === "email") {
          const regEx =
            /[a-zA-Z0-9._%+--]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
          if (
            !regEx.test(field["field_value"]) &&
            field["field_value"].length > 0
          )
            field["error_msg"] = "Email invalid";
          else field["error_msg"] = "";
        }
        field["field_mandatory"] =
          field["field_value"].length > 0  && field["error_msg"].length === 0 ? false : true;
      }
      setElements(newElements);
    });
  };

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="col container">
        <h2 className="mt-2 mb-4 d-flex justify-content-center">
          {page_label}
        </h2>
        <form>
          {fields
            ? fields.map((field, i) => (
                <Element
                  fieldsRequired={fieldsRequired}
                  key={i}
                  field={field}
                />
              ))
            : null}
          <div className="d-flex justify-content-center">
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-primary send-button mt-3 mb-3"
                style={{
                  width: "100%",
                  padding: "8px 25px",
                  fontWeight: "600",
                }}
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormContext.Provider>
  );
}

export default App;
