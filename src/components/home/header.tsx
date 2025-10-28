export default function Header() {
    return (
        <>
            <header className="w-full font-sans font-medium fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-sm border-b border-white/20 shadow-sm">
                <nav className="flex justify-between items-center px-4 md:px-8 py-3 mx-auto w-full xl:max-w-7xl">
                    <div className="text-2xl font-bold whitespace-nowrap shrink text-blue-500">
                        <a href="/">Tiger Classes</a>
                    </div>
                    <ul className="hidden md:flex text-[#7c706a] text-sm">
                        <li className="mx-3 hover:text-blue-500 duration-300 ease-out">
                            <a href="#">Home</a>
                        </li>
                        <li className="mx-3 hover:text-blue-500 duration-300 ease-out">
                            <a href="#">Features</a>
                        </li>
                        <li className="mx-3 hover:text-blue-500 duration-300 ease-out">
                            <a href="#">About</a>
                        </li>
                    </ul>
                    <ul className="flex text-sm">
                        <li className="text-gray-800 hover:text-white hover:bg-blue-400 px-3 py-2 rounded-xl mx-1 duration-300 ease-out hover:cursor-pointer">
                            <a href="/">Sign In</a>
                        </li>
                        <li className="text-white bg-blue-500 px-3 py-2 rounded-xl mx-2 duration-300 ease-out hover:cursor-pointer hover:bg-blue-400">
                            <a href="#" className="flex justify-center items-center">Get Started</a>
                        </li>
                    </ul>
                </nav>
            </header >
        </>
    );
};