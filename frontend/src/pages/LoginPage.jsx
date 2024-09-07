import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });

        } catch (err) {
            console.error('Ошибка:', err);
        }
    }
    

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='shadow-[#2fc481] p-8 max-w-sm shadow-2xl w-full bg-white rounded-2xl'>
                <h1 className='text-center text-2xl mb-8'>Вход</h1>
                <form>
                    <div className='mb-4'>
                        <input
                            type='text'
                            id='email'
                            placeholder='Введите email'
                            required
                            className='w-full border-lime-500 focus:border-lime-600 border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-8'>
                        <input
                            type='password'
                            id='password'
                            placeholder='Введите пароль'
                            required
                            className='w-full border-lime-500 focus:border-lime-600 border-b-2 focus:outline-none' />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='bg-[#2fc481] text-white p-1 rounded-lg hover:shadow-lg w-1/3'>Войти</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
