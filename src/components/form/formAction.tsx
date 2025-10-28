export default function FormAction({
    text = "Don't have an account?",
    linkTo = "#",
    linkName = "Sign up",
}: {
    text?: string,
    linkTo?: string,
    linkName?: string,
}) {
    return (
        <>
            <p className="my-2 text-sm text-gray-500">{text}<a href={linkTo} className="text-blue-500 font-medium ml-1 hover:cursor-pointer">{linkName}</a></p>
        </>
    );
};