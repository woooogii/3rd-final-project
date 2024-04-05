import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubTest from './SubTest';

const RemoveAfterTest1 = () => {
    
    const [id,setId] = useState('');
    const [name,setName] = useState('');

    const [entities, setEntities] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pedal/test')
            setEntities(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log('데이터', {id,name})
        try {
            const response = await axios.post('http://localhost:4000/pedal/test', {
                id: id,
                name: name,
            });
            console.log(response.data)
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                아디:<input type='text' value={id} onChange={(e)=>setId(e.target.value)}/><br/>
                이름:<input type='text' value={name} onChange={(e)=>setName(e.target.value)}/><br/>
                <button type='submit'>전송</button>
            </form>

            <br/><br/>
            <h2>DB에 있는거</h2>
            <SubTest data={entities}/>
        </div>
    );
};

export default RemoveAfterTest1;