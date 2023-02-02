import React, { useState, useEffect } from "react";
import './Form.css';
import axios from 'axios'

const Form = () => {

    const [errors, setErrors] = useState({})
    const [submit, setsubmit] = useState(false);
    const [formValue, setFormValue] = useState({
        name: "",
        value: "",
    })

    const handleChange = (event) => {
        // console.log(event.target.value)
        // const [name, value] = event.target;
        const name = event.target.name
        const value = event.target.value
        // console.log(name, value)

        setFormValue((oldData) => {
            return {
                ...oldData, [name]: value
            }
        })

    }

//        const handleSubmit=async()=>{
//         await axios.post("http://localhost:5001/newUser",formValue)
//       .then(response=>set)
// }
//

    //     console.log(formValue)


    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validate(formValue));
        setsubmit(true);


    }
    useEffect(() => {
        console.log(errors)
        if (Object.keys(errors).length == 0 && submit) {
            console.log(formValue)
        }
    }, [errors])
    const validate = (values) => {
        const error = {};
        const regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        if (!values.name) {
            error.name = "*Name is required!"
        }
        if (!values.email) {
            error.email = "*email is required!"
        }
        else if (!regex_email.test(values.email)) {
            error.email = "*email is invalid!"
        }
        if (!values.dob) {
            error.dob = "*DOB is required!"
        }

        return error
    }
    return (
        <>
            <div className="container">
                <div className="main-container">
                    <h1>Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            <label htmlFor="name">Name:</label><br />
                            <input type="text" name="name" value={formValue.name} onChange={handleChange} placeholder="John Doe" />
                        </div>
                        <p>{errors.name}</p>
                        <div className="info">
                            <label htmlFor="dob">Date Of Birth:</label><br />
                            <input type="date" name="dob" value={formValue.dob} onChange={handleChange} placeholder="" />
                        </div>
                        <p>{errors.dob}</p>
                        <div className="info">
                            <label htmlFor="email">Email:</label><br />
                            <input type="text" name="email" value={formValue.email} onChange={handleChange} placeholder="johndoe@gmail.com" />
                        </div>
                        <p>{errors.email}</p>
                        <div className="info">
                            <label htmlFor="number">Phone No. :</label><br />
                            <input type="number" name="number" value={formValue.number} onChange={handleChange} className="phone-input" placeholder="00 00 00 00 00 " />
                        </div>
                        <button className="btn" value="Submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Form;