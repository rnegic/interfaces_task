'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [selectedRole, setSelectedRole] = useState('Преподаватель');

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="md:text-6xl text-4xl font-bold text-gray-800 mb-4">
                        Посещаемость студентов СОГУ
                    </h1>
                    <p className="text-gray-600 text-2xl">
                        Форма регистрации
                    </p>
                </div>
                <div className="md:w-1/3 bg-white p-8 rounded-lg shadow-md">
                    <div className="mb-6">
                        <div className="flex flex-col space-y-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blue-600"
                                    name="role"
                                    value="Преподаватель"
                                    checked={selectedRole === 'Преподаватель'}
                                    onChange={() => handleRoleChange('Преподаватель')}
                                />
                                <span className="ml-2 text-gray-700">Преподаватель</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blue-600"
                                    name="role"
                                    value="Староста"
                                    checked={selectedRole === 'Староста'}
                                    onChange={() => handleRoleChange('Староста')}
                                />
                                <span className="ml-2 text-gray-700">Староста</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blue-600"
                                    name="role"
                                    value="Студент"
                                    checked={selectedRole === 'Студент'}
                                    onChange={() => handleRoleChange('Студент')}
                                />
                                <span className="ml-2 text-gray-700">Студент</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blue-600"
                                    name="role"
                                    value="Сотрудник деканата"
                                    checked={selectedRole === 'Сотрудник деканата'}
                                    onChange={() => handleRoleChange('Сотрудник деканата')}
                                />
                                <span className="ml-2 text-gray-700">Сотрудник деканата</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            ФИО
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Введите ФИО"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Пароль
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Введите пароль"
                        />
                    </div>
                    <Link href="/dashboard" alt="ewefew">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="button"
                        >
                            Зарегистрироваться
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}