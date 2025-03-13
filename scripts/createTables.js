import pool from '../utils/db.js';

const createTables = async () => {
    try {

        // Удаляем таблицы если уже существуют
        await pool.query(`
            DROP TABLE IF EXISTS attendance CASCADE;
            DROP TABLE IF EXISTS teaching_assignments CASCADE;
            DROP TABLE IF EXISTS study_plans CASCADE;
            DROP TABLE IF EXISTS lesson_types CASCADE;
            DROP TABLE IF EXISTS disciplines CASCADE;
            DROP TABLE IF EXISTS students CASCADE;
            DROP TABLE IF EXISTS groups CASCADE;
            DROP TABLE IF EXISTS teachers CASCADE;
            DROP TABLE IF EXISTS departments CASCADE;
            DROP TABLE IF EXISTS faculties CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
          `);
        console.log('Таблицы успешно удалены (если существовали).');

        // Создаем таблицы
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

        // наполнение тестовыми данными
        await pool.query(`
        -- Факультеты
        INSERT INTO faculties (name) VALUES
        ('Факультет математики и компьютерных наук'),
        ('Факультет экономики');
  
        -- Кафедры
        INSERT INTO departments (name, faculty_id) VALUES
        ('Кафедра информатики и вычислительной техники', 1),
        ('Кафедра прикладной математики и информатики', 1),
        ('Кафедра экономики', 2);
  
        -- Преподаватели
        INSERT INTO teachers (full_name, date_of_birth, department_id, category) VALUES
        ('Иванов Иван Иванович', '1980-05-10', 1, 'доцент'),
        ('Петров Петр Петрович', '1975-12-20', 1, 'профессор'),
        ('Иванова Иванка Ивановна', '1985-03-15', 2, 'ассистент');
  
        -- Группы
        INSERT INTO groups (name, faculty_id) VALUES
        ('ИВТ-33', 1),
        ('ПМ-31', 1),
        ('Э-42', 2);
  
        -- Студенты
        INSERT INTO students (full_name, gender, date_of_birth, group_id) VALUES
        ('Смирнов Алексей Сергеевич', 'мужской', '2002-08-25', 1),
        ('Кузнецова Ольга Петровна', 'женский', '2003-01-12', 1),
        ('Михайлов Дмитрий Андреевич', 'мужской', '2002-11-03', 2),
        ('Попова Екатерина Ивановна', 'женский', '2001-09-28', 3);
  
        -- Дисциплины
        INSERT INTO disciplines (name) VALUES
        ('Базы данных'),
        ('Основы и методология программирования'),
        ('Экономика предприятия');
  
        -- Типы занятий
        INSERT INTO lesson_types (name) VALUES
        ('Лекция'),
        ('Практическое занятие'),
        ('Лабораторная работа');
  
        -- Учебные планы
        INSERT INTO study_plans (group_id, discipline_id, semester, hours) VALUES
        (1, 1, 1, 60),
        (1, 2, 1, 72),
        (2, 1, 1, 60);
  
        -- Учебные поручения
        INSERT INTO teaching_assignments (department_id, teacher_id, discipline_id, group_id, lesson_type_id, semester, week_number, day_of_week, start_time, end_time, parity) VALUES
        (1, 1, 1, 1, 1, 1, 1, 1, '09:00:00', '10:30:00', 'обе'),
        (1, 2, 2, 1, 2, 1, 2, 2, '11:00:00', '12:30:00', 'четная'),
        (2, 3, 3, 3, 1, 1, 3, 3, '14:00:00', '15:30:00', 'нечетная');
  
        -- Посещаемость
        INSERT INTO attendance (student_id, teaching_assignment_id, date, present) VALUES
        (1, 1, '2024-11-04', true),
        (2, 1, '2024-11-04', false),
        (1, 2, '2024-11-05', true);
  
        -- Пользователи
        INSERT INTO users (email, password, role, teacher_id, student_id) VALUES
        ('teacher1@example.com', 'password123', 'преподаватель', 1, NULL),
        ('student1@example.com', 'password456', 'студент', NULL, 1),
        ('dekanat@example.com', 'dekanatpass', 'деканат', NULL, NULL);
      `);
        console.log('Тестовые данные успешно добавлены.');
    } catch (error) {
        console.error('Ошибка при создании таблиц:', error);
    } finally {
        await pool.end();
    }
};

createTables();