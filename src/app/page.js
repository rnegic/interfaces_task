import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Посещаемость студентов СОГУ
          </h1>
          <p className="text-gray-600 text-2xl">
            Зайдите под своей учетной записью.
          </p>
        </div>
        <div className="md:w-1/3 bg-white p-8 rounded-lg">
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
          <div className="flex flex-col gap-5">
            <Link href="/dashboard" alt="ewefew">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
              >
                Войти
              </button>
            </Link>
            <span className="text-slate-500">Нет аккаунта?</span>
            <Link href="/registration" alt="ewefew">
              <button
                className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
              >
                Регистрация
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}