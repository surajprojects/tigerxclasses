export async function compressImage(file: File, defaultSize = 200): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");

            const size = defaultSize; // profile picture dimension
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0, size, size);

            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject("Compression failed");
                    resolve(blob);
                },
                "image/jpeg",
                0.8 // quality
            );
        };

        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
};