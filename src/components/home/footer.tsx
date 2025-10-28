export default function Footer() {
    return (
        <>
            <footer className="w-full border-t border-gray-200 bg-[#fefefe]">
                <div className="flex flex-col md:flex-row justify-between mx-auto py-12 px-4 md:px-8 border-b border-gray-200 w-full xl:max-w-7xl">
                    <div className="max-w-xs lg:max-w-sm">
                        <h6 className="font-bold text-2xl text-blue-500">Tiger Classes</h6>
                        <p className="text-[#7c706a] my-4">Modern student management system for educational institutions.</p>
                    </div>
                    <ul className="text-[#7c706a] my-5 w-fit md:my-auto">
                        <li className="m-3 mb-4 text-black font-medium">Explore</li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href={"#"}>Features</a>
                        </li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href={"#"}>Pricing</a>
                        </li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href={"#"}>Security</a>
                        </li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href={"/about/#"}>About</a>
                        </li>
                    </ul>
                    <ul className="text-[#7c706a] w-fit mr-12">
                        <li className="m-3 mb-4 text-black font-medium">Connect</li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href={"#"}>Twitter</a>
                        </li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href={"#"}>Instagram</a>
                        </li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href={"#"}>LinkedIn</a>
                        </li>
                        <li className="m-3 hover:text-blue-500 duration-300 ease-out">
                            <a href="https://tigerxinsights.com/#contact" target="_blank">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-center items-center py-8 px-5">
                    <div className="text-sm text-[#7c706a] text-center flex flex-col items-center">
                        <span>Made with ❤️ by TigerxInsights &copy; 2025</span>
                        <span>Your insights, our priority</span>
                    </div>
                </div>
            </footer>
        </>
    );
};