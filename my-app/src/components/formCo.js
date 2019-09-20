import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PersonCard from "./PersonCard";
import styled from "styled-components";


const CardDiv = styled.div `
    display:flex;
    justify-content:center;
    align-items:center;
    flex-flow:column wrap;
    border:1px solid black;
    margin:1% 0;
    
   
`;
const CardP = styled.p`

`; 



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
            <Form className="flex-it">
                <Field type="text" name="name" placeholder="Name"></Field>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Email"></Field>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field type="password" name="pass" placeholder="Password"></Field>
                {touched.pass && errors.pass && (
                    <p>{errors.pass}</p>
                )}
                <label>
                    Terms
                    <Field type="checkbox" name="terms" checked={values.terms} ></Field>
                </label>
                
                <button type="submit">Sign Up!</button>
            </Form>
        {/* <PersonCard people = {people}></PersonCard> */}
        {people.map(person =>(
            
            <CardDiv key={person.id}>
                <CardP>Name: {person.name}</CardP>
                <CardP>Email: {person.email}</CardP>
                <CardP>Password: {person.pass}</CardP>
            </CardDiv>
            
        ))}
        </div>
    );
};

const FormikFormCo = withFormik({
    mapPropsToValues({name, email, terms, pass}) {
        return {
            name: name || "",
            email: email || "",
            terms: terms || false,
            pass: pass || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .required("You must include name")
        .min(1, "You need a longer name!"),
        email: Yup.string()
        .email("invalid email")
        .required("You must include an email")
        .max(20, "to long of an email"),
        pass: Yup.string()
        .min(4,"to short bud")
        .required("You must have a pass"),
        terms: Yup.boolean().required("You must accept")

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