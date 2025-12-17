"use client";

import clsx from "clsx";
import Spinner from "../ui/spinner";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/utils/imageCompressor";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";

export default function ProfileImageUpload({
    type = "profile",
    profileImg = "/avatar.png",
    studentId,
}: {
    type?: "profile" | "institute" | "student";
    profileImg?: string;
    userId?: string;
    studentId?: string;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const size = (type === "profile" || type === "institute");
        const blob = await compressImage(file, size ? 300 : 200);

        if (blob.size > 18 * 1024) {
            alert("Image still too large after compression!!!");
            return;
        }

        setLoading(true);

        const form = new FormData();
        form.append("file", blob, "avatar.jpeg");
        form.append("type", type);

        if (studentId) form.append("studentId", studentId);

        try {
            await axiosProtected.post(`/users/profile`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        };
    };
    return (
        <>
            <div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    style={{ display: "none" }}
                />
            </div>
            <div
                onClick={openFilePicker}
                className={clsx("size-24 rounded-full overflow-hidden cursor-pointer border border-gray-400/80 hover:opacity-80 transition duration-300 ease-in-out shadow-sm relative", loading ? "opacity-80" : "")}
            >
                {loading && <Spinner customize={true} className="fill-blue-500 absolute m-9" />}
                <img
                    src={profileImg}
                    alt="profile image"
                    className="w-full h-full object-cover"
                />
            </div>
        </>
    );
};