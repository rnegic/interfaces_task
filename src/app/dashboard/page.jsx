'use client'

import React, { useState } from 'react';

export default function AttendancePage() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    //КОД ЗАГЛУШКА!!!
    const handleShowTable = () => {
        const fakeData = Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            studentName: 'Мария Дб',
            attendance: Array(8).fill(false),
        }));
        setAttendanceData(fakeData);
        setShowTable(true);
    };

    const handleCheckboxChange = (studentId, dayIndex) => {
        setAttendanceData(prevData =>
            prevData.map(student => {
                if (student.id === studentId) {
                    const updatedAttendance = [...student.attendance];
                    updatedAttendance[dayIndex] = !updatedAttendance[dayIndex];
                    return { ...student, attendance: updatedAttendance };
                }
                return student;
            })
        );
    };

    const dates = ['01/11', '05/11', '10/11', '14/11', '20/11', '22/11', '26/11', '30/11'];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-white shadow-md p-4">
                <nav>
                    <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-2m3 2v-4M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        Журнал посещаемости
                    </a>
                    <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        Статистика
                    </a>
                    <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Выйти
                    </a>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Посещаемость
                </h1>
                <div className="flex flex-wrap gap-4 items-center mb-6">
                    <select className="border rounded p-2 text-gray-700">
                        <option>Предмет</option>
                        <option>Базы данных</option>
                    </select>
                    <select className="border rounded p-2 text-gray-700">
                        <option>Группа</option>
                        <option>ПМ-33</option>
                    </select>
                    <select className="border rounded p-2 text-gray-700">
                        {months.map((item, idx) => <option key={idx}>{item}</option>)}
                    </select>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleShowTable}
                    >
                        Показать таблицу
                    </button>
                </div>
                {showTable && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">№</th>
                                    <th className="py-2 px-4 border-b">ФИО студента</th>
                                    {dates.map((date, index) => (
                                        <th key={index} className="py-2 px-4 border-b">
                                            {date}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((student) => (
                                    <tr key={student.id}>
                                        <td className="py-2 px-4 border-b">{student.id}</td>
                                        <td className="py-2 px-4 border-b">{student.studentName}</td>
                                        {student.attendance.map((present, index) => (
                                            <td key={index} className="py-2 px-4 border-b text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={present}
                                                    onChange={() => handleCheckboxChange(student.id, index)}
                                                    className="form-checkbox h-4 w-4 text-blue-600"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}