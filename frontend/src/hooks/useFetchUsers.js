import { useEffect, useState } from 'react';

const useFetchUsers = () => {
    const [users, setUsers] = useState([])
   
    useEffect(() =>{
        const abortCont = new AbortController();

         /* Load activities from server */
        fetch("http://localhost:8000/api/users", { signal: abortCont.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('Could not load the data...');
                }
                return res.json()
            })
            .then(data => {
                setUsers(data.users);
            })
            .catch(err => {
                if (err.name !== 'AbortError'){
                    console.log("Use Fetach -", err);
                }
            });
        
        return () => abortCont.abort();

    }, []);

    return { users };
}

export default useFetchUsers;