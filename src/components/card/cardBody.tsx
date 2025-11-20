export default function CardBody({
    children,
}: {
    children?: React.ReactNode
}) {
    return (
        <>
            <div className="mt-2 pt-3  border-t border-gray-200 gap-3 grid grid-cols-2">
                {children}
            </div>
        </>
    );
};