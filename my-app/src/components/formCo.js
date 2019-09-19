import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const FormCo = props =>{
    return (
        <div>
            <Form>
                <Field type="text" name="name" placeholder="Name"></Field>
                <Field type="text" name="email" placeholder="Email"></Field>
                <label>
                    Terms
                    <Field type="checkbox" name="terms"></Field>
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
})(FormCo)




export default FormikFormCo;