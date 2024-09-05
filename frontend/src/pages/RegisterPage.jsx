import React from 'react'

export default function RegisterPage() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='shadow-lg p-8 max-w-sm bg-white w-full'>
                <h1 className='text-center font-bold text-2xl mb-6'>Регистрация</h1>
                <form>
                    <div className='mb-4'>
                        <input
                            type='text'
                            id='username'
                            placeholder='Имя'
                            className='w-full border-neutral-950 border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='text'
                            id='email'
                            placeholder='Email'
                            className='w-full border-neutral-950 border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='password'
                            id='password'
                            placeholder='Пароль'
                            className='w-full border-neutral-950 border-b-2 focus:outline-none' />
                    </div>
                    <div className='mb-8'>
                        <input
                            type='password'
                            id='confirm-password'
                            placeholder='Повторите пароль'
                            className='w-full border-neutral-950 border-b-2 focus:outline-none' />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='bg-gray-950 text-white p-1 rounded-lg hover:bg-gray-700'>Зарегистрироваться</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
