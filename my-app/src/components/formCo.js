import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const FormCo = ({values, errors, touched}) =>{
    
    return (
        <div>
            <Form>
                <Field type="text" name="name" placeholder="Name"></Field>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Email"></Field>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <label>
                    Terms
                    <Field type="checkbox" name="terms" checked={values.terms} ></Field>
                </label>
                
                <button>Sign Up!</button>
            </Form>


        </div>
    );
};

const FormikFormCo = withFormik({
    mapPropsToValues({name, email, terms}) {
        return {
            name: name || "",
            email: email || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("You must include name"),
        email: Yup.string().required("You must include an email")
    }),
})(FormCo)




export default FormikFormCo;