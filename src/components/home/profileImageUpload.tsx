"use client";

import { compressImage } from "@/utils/imageCompressor";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function ProfileImageUpload() {
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Compress the image
        const compressedBlob = await compressImage(file);

        // Check final size (should be < 18 KB)
        if (compressedBlob.size > 18 * 1024) {
            alert("Image still too large after compression");
            return;
        }

        // Upload to supabase
        const supabase = createSupabaseClient();

        const filePath = `users/${crypto.randomUUID()}.jpeg`;

        const { error } = await supabase.storage
            .from("avatars")
            .upload(filePath, compressedBlob, {
                cacheControl: "3600",
                upsert: true,
                contentType: "image/jpeg",
            });

        if (error) {
            console.log(error);
            alert("Upload failed");
            return;
        }

        // Get public URL
        const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);

    };
    return (
        <>
            <input type="file" accept="image/*" onChange={handleFile} />
        </>
    );
};