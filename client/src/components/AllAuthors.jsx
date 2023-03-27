import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

const AllAuthors = () => {

    const [formData, setFormData] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/authors")
        .then((res)=>{
            if (res && res.data) {
                setFormData(res.data);
            }
    })
        .catch((err)=>{
            console.log(err);
        })
    }, [setFormData]);

    const navigateToUpdateAuthor= (authorID) => {
        navigate(`/edit/${authorID}`)
    }

    const deleteAuthor = (authorID) => {
        axios.delete('http://localhost:8000/api/authors/' + authorID)
            .then(() => {
                removeFromDom(authorID)
            })
            .catch(err => console.log(err))
    }

    const removeFromDom = (authorID) => {
        setFormData(formData.filter(a => a._id !== authorID))
    }


    return (
        <div>
            <h1>Favorite Authors</h1>
            <Link to={`/new`}>Add an author</Link>
            <p>We have quotes by:</p>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Author</th>
                                <th>Actions Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.map((author, index) => (
                                <tr key={index}>
                                    <p>{author.authorName}</p>
                                    <td><button onClick={(e) => navigateToUpdateAuthor(author._id)}>Edit</button> | <button className='delete' onClick = { () => deleteAuthor(author._id) }>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};
export default AllAuthors;