import Link from "next/link";

const Navbar = () => {
    return (
        <div className='pl-5 bg-white h-10 flex flex-col justify-center text-black'>
            <div className="flex justify-between p-5">
                <span>СОГУ</span>
                <div className="flex gap-4">
                    <Link href='/'>
                        Вход
                    </Link>

                    <Link href='/registration'>
                        Регистрация
                    </Link>

                    <Link href='/dashboard'>
                        Журнал
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;