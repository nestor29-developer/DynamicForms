import dynamicFormJson from "./fields.json";
import { useState, useEffect } from "react";
import Element from "./components/Element";
import { FormContext } from "./FormContext";

function App() {
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(dynamicFormJson[0]);
  }, []);

  const { fields, page_label } = elements ?? {};
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("elements by handleSubmit", elements);
  };

  const handleChange = (id, event, text) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { data_type, uid } = field;
      debugger;
      if (id === uid) {
        // switch (data_type) {
        //   case 'checkbox':
        //     field['field_value'] = event.target.checked;
        //     break;

        //   default:
        field["field_value"] = event.target
          ? event.target.value
          : !text.props
          ? ""
          : text.props.children.props
          ? localStorage.getItem("lastTextEditor")
          : text.props.children;
        //   break;
        if (!event.target && !text.props.children.props && text.props.children)
          localStorage.setItem("lastTextEditor", text.props.children);
        // }
      }
      setElements(newElements);
    });
    console.log("elements by handleChange", elements);
  };

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
        <h2 className="mt-2 mb-4">{page_label}</h2>
        <form>
          {fields
            ? fields.map((field, i) => <Element key={i} field={field} />)
            : null}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </FormContext.Provider>
  );
}

export default App;
