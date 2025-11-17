export default function CardBody({
    children,
}: {
    children?: React.ReactNode
}) {
    return (
        <>
            <div className="my-6 gap-3 grid grid-cols-2">
                {children}
            </div>
        </>
    );
};