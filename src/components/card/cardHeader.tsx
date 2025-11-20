export default function CardHeader({
    title = "Title",
    description = "Description",
    children,
}: {
    title?: string,
    description?: string,
    children?: React.ReactNode,
}) {
    return (
        <>
            <div>
                <h5 className="text-xl font-medium text-gray-800 flex items-center">{children}{title}</h5>
                <p className="text-gray-500 mt-1 text-base">{description}</p>
            </div>
        </>
    );
};