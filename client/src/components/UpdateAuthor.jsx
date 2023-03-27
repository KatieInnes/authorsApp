import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link} from "react-router-dom";

const UpdateAuthor = (props) => {
    const {id} = useParams();

    const [authorName, setAuthorName] = useState("");

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const authorValidation = (e) => {

        let isValid = true;
        const errorMessages = {};

        if (authorName.length < 3) {
            errorMessages.authorName = "Name must be at least 3 characters";
            isValid = false;
        }

        setErrors(errorMessages);

        return isValid;

    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                setAuthorName(res.data.authorName);
            }) 
            .catch( err => console.log(err) );
    }, [id]);

    const UpdateAuthor = (e) => {
        e.preventDefault();
        if (authorValidation()){
            axios.put(`http://localhost:8000/api/authors/${id}`, {
                authorName,
            })
                .then(res => {
                    navigate(`/`);
            })
                .catch(err => console.log(err))
        }
        
    }

    return(
        <>
            <h1>Favorite Authors</h1>
            <Link to={`/`}>home</Link>
            <p>Edit this author!</p>
            <form onSubmit={ UpdateAuthor }>
                <div>
                    {errors.authorName ? <p style={{ color: 'red',}}>{errors.authorName}</p> : ""}
                    <label>Author Name: </label> 
                    <input type="text" name="authorName" value={authorName} onChange={ (e) => setAuthorName(e.target.value) } />
                </div>
                <Link to={`/`}>Cancel</Link>
                <input type = "submit" value = "Submit" />
            </form>

        </>

    );

};

export default UpdateAuthor;
