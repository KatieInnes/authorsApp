import './App.css';
import AuthorForm from './components/AuthorForm';
import AllAuthors from './components/AllAuthors';
import UpdateAuthor from './components/UpdateAuthor';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AllAuthors /> } />
        <Route path="/new" element= { <AuthorForm /> } />
        <Route path="/edit/:id" element= { <UpdateAuthor /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
