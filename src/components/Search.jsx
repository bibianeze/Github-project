import React, {useState} from "react";
import "../style/Search.css";
import { MdSearch } from "react-icons/md";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Search = () => {
  const {errors, requests, isLoading, searchUser} = useGlobalContext();
  const [user, setUser] = useState("")
  // const [error, setError] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    // handle search user
    searchUser(user)
    }

  return (
    <section className="section">
      <div className="section-center search-card">
        {errors.show && <div className="error-wrapper"> <p>{errors.msg}</p> </div>}
        <form onSubmit={handleSubmit}>
         
          <div className="form-control">
            <MdSearch />
            <input type="text" placeholder="Enter Github user" value={user} onChange={(e)=>setUser(e.target.value)} />
            {requests > 0 && !isLoading && <button type="submit">Search</button>}
          </div>
        </form>
        <h3 className="req">Requests: {`${requests}`}/ 60</h3>
      </div>
    </section>
  );
};

export default Search;
