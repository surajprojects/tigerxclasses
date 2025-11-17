export default function StudentPageHeader({
    title = "Title",
    description = "Description",
}: {
    title?: string,
    description?: string,
}) {
    return (
        <>
            <div className="mx-5">
                <h4 className="text-gray-800 font-bold text-3xl">{title}</h4>
                <p className="text-gray-500 text-lg">{description}</p>
            </div>
        </>
    );
};