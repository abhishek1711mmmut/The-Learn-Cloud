import React, { useEffect, useRef, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import {  BsFillTrashFill } from "react-icons/bs";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

function Home() {

    const [todos, settodos] = useState([])

    const markDone=(id)=>{
        axios.put('http://localhost:4000/update/' + id)
        .then(result=>{
            location.reload();
        })
        .catch(err=>console.log(err))
    }

    const handleDelete=(id)=>{
        axios.delete('http://localhost:4000/delete/' + id)
        .then(result=>{
            location.reload();
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        axios.get('http://localhost:4000/get')
        .then(result=>settodos(result.data))
        .catch(err=>console.log(err))
        console.log(todos)
    },[])

    const dragItem=useRef(0)
    const draggedOverItem=useRef(0)

    function handleSort(){
        const taskClone=[...todos]
        const firstTask=taskClone[dragItem.current]
        const secondTask=taskClone[draggedOverItem.current]
        axios.post('http://localhost:4000/swap', {firstTask, secondTask})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
        location.reload();
    }

  return (
    <div className='home'>
        <h1 className='text-7xl tracking-wider bg-gradient-to-b from-[#E21143] to-[#FFB03A] text-transparent bg-clip-text font-bold italic'>
            Todo List
        </h1>
        <hr className='w-full border-orange-500 border-2 my-4'/>
        <Create/>
        {
            todos.length === 0 ? 
            <div className='text-center my-3'>
                <h2 className='text-3xl font-semibold text-red-500 italic'>No list found !</h2>
                <p className='text-4xl font-semibold text-green-400 italic'>Start creating your list...</p>
            </div>
            :
            <div className='w-full flex flex-col justify-center items-center gap-5 my-5'>
                {
                    todos.map((todo, index)=>(
                        <div className='relative flex h-10 p-2 pl-3 w-[80%] border-2 rounded-xl' key={index} 
                        draggable
                        onDragStart={()=>(dragItem.current=index)} 
                        onDragEnter={()=>(draggedOverItem.current=index)}
                        onDragEnd={handleSort}
                        onDragOver={(e)=>e.preventDefault()}
                        >
                            <div className='flex gap-5 items-center' onClick={()=>markDone(todo._id)}>
                                {
                                    todo.done ? <ImCheckboxChecked />  : <ImCheckboxUnchecked />
                                }
                                <p className={`text-gray-500 ${todo.done ? "line-through":""}`}>
                                    {todo.task}
                                </p>
                            </div>
                            <div className='text-red-600 cursor-pointer'><BsFillTrashFill className='absolute right-3' onClick={()=>handleDelete(todo._id)}/></div>
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default Home