import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PersonCard from "./PersonCard"


const FormCo = ({values, errors, touched, status}) =>{
    const [people, setPeople] = useState([]);
    useEffect(()=> {
        if (status) {
            console.log("status", status)
            setPeople([...people, status])
        }
    },[status]);
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
        {/* <PersonCard people = {people}></PersonCard> */}
        {people.map(person =>(
            <div key="">
                <p>Name: {person.name}</p>
                <p>Email: {person.email}</p>
                <p>TOS: {person.terms}</p>
            </div>
        ))}
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
    handleSubmit(values, {setStatus, resetForm}){
        axios 
        .post("https://reqres.in/api/users", values)
        .then(res =>{
            console.log("res data",res.data);
            console.log("help",values)
            setStatus(res.data);
            resetForm("");
        })
        .catch(err => console.log(err.res));
    },
})(FormCo)




export default FormikFormCo;