import React, { useEffect, useState } from 'react';
import './searchbar.css';
import { Search } from '@material-ui/icons';
import axios from "axios";
import { Link } from 'react-router-dom';


const SearchInput = () => {
    const [ query, setQuery ] = useState('');
    const [ search, setSearch ] = useState(false);
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const searchUsers = async () => {
            try {
                const res = await axios.get('https://freedomnet-node-backend.herokuapp.com/api/users/search');
                setUsers(res.data);
            } catch (err) {
                console.log(err)
            }
        };
        searchUsers();
    }, [])

    
    return (
        <>
            
                <input 
                    onChange={(e) => {setQuery(e.target.value); setSearch(true)}}
                    // onBlur={(e) => setSearch(false)}
                    type='text'
                    placeholder='Search for friends, posts and more' 
                    className="searchInput" 
                    />
            
      </>
    );
};

export default SearchInput;