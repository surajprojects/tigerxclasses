export default function FormHeader({
    title = "Welcome back",
    description = "Enter your credentials to access your account",
}: {
    title?: string,
    description?: string,
}) {
    return (
        <>
            <div className="text-center">
                <h3 className="text-3xl font-bold my-2 text-[#2a2522]">{title}</h3>
                <p className="text-base text-gray-500">{description}</p>
            </div>
        </>
    );
};