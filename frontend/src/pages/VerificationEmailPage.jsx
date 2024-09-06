import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function VerificationEmailPage() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async (code) => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/verify`, { code })

                if (response.status === 200) {
                    navigate('/login', { replace: true })
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (code.length === 6) {
            setCode('');
            verify(code);
        }
    }, [code])


    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='p-8 max-w-sm w-full bg-white rounded-2xl shadow-2xl shadow-[#2fc481]'>
                <h1 className='text-center text-xl mb-8'>Подтверждение Email</h1>
                <form>
                    <input
                        type='text'
                        placeholder='Введите код подтверждения'
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        className='w-full border-lime-500 focus:border-lime-600 border-b-2 focus:outline-none'
                    />
                </form>
            </div>
        </div>
    )
}
