import React from 'react'

export default function ProfileActions() {

    const handleSubmit = (event) => {
        event.preventDefault();


    }
  return (
    <>
        <button 
        type='sumbit' 
        onClicl={handleSubmit}
        className='p-1 bg-lime-500 rounded-lg text-white hover:bg-lime-800'>Отправить запрос в друзья</button>
    </>
  )
}
