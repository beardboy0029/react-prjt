import React from "react";
import { Form, Formik } from "formik";
import FormDates from "./shared/global-formfeilds/fromdate";
import FormInput from "./shared/global-formfeilds/forminput";
import FormTimes from "./shared/global-formfeilds/formtime";
import FormSelectableGroup from "./shared/global-formfeilds/radiocustombutton";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <Formik
        initialValues={{
          date: null,
          time: null,
          name: "",
          gender: "",
          skills: [],
        }}
        onSubmit={(values) => {
          console.log("Form Values:", values);
        }}
      >
        {() => (
          <Form className="space-y-4 mt-4">
            <FormDates label="Select Date" name="date" required />
            <FormTimes label="Select Time" name="time" required />
            <FormInput label="Name" name="name" required />

            <FormSelectableGroup
              label="Select Gender"
              name="gender"
              required
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />

            <FormSelectableGroup
              label="Select Skills"
              name="skills"
              multiple
              options={[
                { label: "React", value: "react" },
                { label: "Node", value: "node" },
                { label: "Python", value: "python" },
              ]}
            />

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;