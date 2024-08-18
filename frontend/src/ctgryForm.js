import { useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

export default function CategoryForm(props) {
    const [name, setName] = useState("")
    const [formError, setFormError] = useState({});
    const errors = {};

    const validationError = () => {
        if (name.trim().length === 0) {
            errors.name = "Name is Required"
        }
    }


    const handleSubmit =  async (e) => {
        e.preventDefault();
        const formData = {
            name: name
        }
        validationError()
        if (isEmpty(errors)) {
            try{ 
                const response = await axios.post("http://localhost:3050/api/categories", formData,{
                    headers : {
                        Authorization : localStorage.getItem("token")
                    }
                })
                        const result = response.data;
                        props.addCategory(result);
                        setFormError({});
                        setName("");
    

            }catch (err){
                console.log(err.message);
            }
            // axios.post("http://localhost:3050/api/categories", formData,{
            //     headers : {
            //         Authorization : localStorage.getItem("token")
            //     }
            // })
            //     .then((response) => {
            //         const result = response.data;
            //         props.addCategory(result);
            //         setFormError({});
            //         setName("");

            //     }).catch((err) => {
            //         console.log(err.message);
            //     })
        } else {
            setFormError(errors)
        }


    }
    return (
        <div>
            <h2> Add Category </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> Enter Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    id="name"
                />
                {formError.name && <span style={{ color: "red" }}>{formError.name}</span>}
                <input type="submit" />
            </form>

        </div>
    )
}