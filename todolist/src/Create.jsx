import React, { useState } from 'react'
import axios from 'axios'

function Create() {

    const [task, setTask]=useState();

    const handleAdd=()=>{
        axios.post('http://localhost:4000/add', {task:task})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
        location.reload();
    }

    const handleKeyDown=(e)=>{
      if(e.key==='Enter'){
        handleAdd();
      }
    }

  return (
    <div className='w-full max-w-[50vw] flex gap-x-5'>
        <input type="text" placeholder='Enter your task here ...  ' onChange={(e)=>setTask(e.target.value)}
          className='p-3 outline-none border-2 border-gray-300 rounded-2xl w-[70%] italic'
          onKeyDown={handleKeyDown}
        />
        <button type='button' onClick={handleAdd}
        className='px-3 py-2 rounded-2xl bg-orange-400 w-[20%] text-2xl text-white hover:bg-green-400 transition-all duration-200'>
          Add
        </button>
    </div>
  )
}

export default Create