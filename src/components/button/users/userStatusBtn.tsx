"use client"

import { useState } from "react";
import StatusBtn from "../statusBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";

export default function UserStatusBtn({ userId = "1" }: { userId?: string }) {
    const router = useRouter();
    const [userStatusData, setUserStatusData] = useState("INACTIVE");

    const updateUserStatus = () => {
        setUserStatusData((prevData) => prevData === "INACTIVE" ? "ACTIVE" : "INACTIVE");
    };

    const handleStatus = async () => {
        try {
            await axiosProtected.patch(`/users/${userId}`, { status: userStatusData });
            toast.success("User status updated successfully!!!");
            updateUserStatus();
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    return (
        <>
            <StatusBtn handleStatus={handleStatus} />
        </>
    );
};