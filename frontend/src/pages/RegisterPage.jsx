import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleInputChange =(event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
            if (response.status === 200) {
                navigate('/verify', {replace: true});
            }

        } catch (err) {
            setErrors(err.response.data.message);
            console.log(err.response.data);
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='shadow-[#2fc481] p-8 max-w-sm shadow-2xl w-full bg-white rounded-2xl'>
                <h1 className='text-center text-2xl mb-8'>Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <input
                            type='text'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            name='firstName'
                            id='Имя'
                            placeholder='Имя'
                            required
                            className='w-full border-lime-500 focus:border-lime-600 border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='text'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            name='lastName'
                            id='Фамилия'
                            placeholder='Фамилия'
                            required
                            className='w-full border-lime-500 focus:border-lime-600 border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='text'
                            value={formData.email}
                            onChange={handleInputChange}
                            name='email'
                            id='email'
                            placeholder='Email'
                            required
                            className='w-full border-lime-500 focus:border-lime-600 border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            name='password'
                            id='password'
                            placeholder='Пароль'
                            required
                            className='w-full border-lime-500 focus:border-lime-600  border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-8'>
                        <input
                            type='password'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            name='confirmPassword'
                            id='confirm-password'
                            placeholder='Повторите пароль'
                            required
                            className='w-full border-lime-500 focus:border-lime-600 border-b-2 focus:outline-none' />
                    </div>
                    {errors && <div>{errors}</div> }
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='bg-[#2fc481] text-white p-1 rounded-lg hover:shadow-lg'>Зарегистрироваться</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
