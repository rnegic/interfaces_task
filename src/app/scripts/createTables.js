import pool from '../utils/db';

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE faculties (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );

            CREATE TABLE departments (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                faculty_id INTEGER REFERENCES faculties(id) ON DELETE CASCADE
            );

            CREATE TABLE teachers (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                date_of_birth DATE,
                department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
                category VARCHAR(50) CHECK (category IN ('ассистент', 'доцент', 'профессор'))
            );

            CREATE TABLE groups (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL UNIQUE,
                faculty_id INTEGER REFERENCES faculties(id) ON DELETE CASCADE
            );

            CREATE TABLE students (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                gender VARCHAR(10),
                date_of_birth DATE,
                group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE
            );

            CREATE TABLE disciplines (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );

            CREATE TABLE lesson_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL UNIQUE
            );


            CREATE TABLE study_plans (
                id SERIAL PRIMARY KEY,
                group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
                discipline_id INTEGER REFERENCES disciplines(id) ON DELETE CASCADE,
                semester INTEGER,
                hours INTEGER
            );


            CREATE TABLE teaching_assignments (
                id SERIAL PRIMARY KEY,
                department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
                teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
                discipline_id INTEGER REFERENCES disciplines(id) ON DELETE CASCADE,
                group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
                lesson_type_id INTEGER REFERENCES lesson_types(id) ON DELETE CASCADE,
                    semester INTEGER,
                week_number INTEGER CHECK (week_number BETWEEN 1 AND 18), -- Предполагаем максимум 18 недель в семестре
                day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7), -- 1 - понедельник, 7 - воскресенье
                start_time TIME,
                end_time TIME,
                parity VARCHAR(10) CHECK (parity IN ('четная', 'нечетная', 'обе'))
            );

            CREATE TABLE attendance (
                id SERIAL PRIMARY KEY,
                student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
                teaching_assignment_id INTEGER REFERENCES teaching_assignments(id) ON DELETE CASCADE,
                date DATE,
                present BOOLEAN
            );

            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255),
                role VARCHAR(50) CHECK (role IN ('деканат', 'преподаватель', 'староста', 'студент')),
                teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
                student_id INTEGER REFERENCES students(id) ON DELETE SET NULL
            );
    `);
        console.log('Таблицы успешно созданы или уже существуют');
    } catch (error) {
        console.error('Ошибка при создании таблиц:', error);
    } finally {
        await pool.end();
    }
};

createTables();