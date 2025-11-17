export default function CardHeader({
    title = "Title",
    description = "Description",
}: {
    title?: string,
    description?: string,
}) {
    return (
        <>
            <div>
                <h5 className="text-2xl font-medium text-gray-800">{title}</h5>
                <p className="text-gray-500 mt-1">{description}</p>
            </div>
        </>
    );
};