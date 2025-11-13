export default function apiErrorHandle(error: unknown) {
    if (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as any).code === "string"
    ) {
        if (error.code === "P2025") {
            return Response.json({ message: "Not found!!!" }, { status: 404 });
        }
        else if (error.code === "P2002") {
            return Response.json({ message: "Must be unique!!!" }, { status: 409 });
        }
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
};