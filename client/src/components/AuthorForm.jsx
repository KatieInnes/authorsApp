import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const AuthorForm = () => {
    const [authorName, setAuthorName] = useState("");

    // const {id} = useParams();

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const storeValidation = (e) => {

        let isValid = true;
        const errorMessages = {};

        if (authorName.length < 3) {
            errorMessages.authorName = "Name must be at least 3 characters";
            isValid = false;
        }

        setErrors(errorMessages);

        return isValid;

    }

    const createAuthor = (e) => {
        e.preventDefault();
        if (storeValidation()){
            axios.post('http://localhost:8000/api/authors', {
            authorName,
            })
            .then(res => {
                setAuthorName("");
                navigate(`/`)
            })
            .catch(e => {
                console.log("error", e);
            })
        }};



    return(
        <div>
            <h1>Favorite Authors</h1>
            <Link to={`/`}>home</Link>
            <p>Add a new author!</p>
            <div className='card'>
                <form onSubmit = { createAuthor }>
                    <div>
                        {errors.authorName ? <p style={{ color: 'red',}}>{errors.authorName}</p> : ""}
                        <label>Author Name: </label>
                        <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)}/>
                    </div>
                    <div>
                        <Link to={`/`}>Cancel</Link>
                        <input type = "submit" value = "Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AuthorForm;