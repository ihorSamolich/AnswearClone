import { IconCloudUpload, IconPhoto } from "@tabler/icons-react";
import { isVideoFile } from "utils/fileUtils.ts";

import { ChangeEvent, forwardRef, useRef } from "react";

type FileInputProps = {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    previewImage: string | undefined;
    setPreviewImage: (value: string | undefined) => void;
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ onChange, previewImage, setPreviewImage, ...props }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const file = input.files && input.files[0];

        if (file) {
            if (/^image\/\w+/.test(file.type)) {
                setPreviewImage(URL.createObjectURL(file) as string);
            }
            if (/^video\/\w+/.test(file.type)) {
                const url = URL.createObjectURL(file);
                const videoElement = videoRef.current;
                if (videoElement) {
                    videoElement.src = url;

                    videoElement.onloadeddata = () => {
                        const canvas = canvasRef.current;
                        if (canvas) {
                            canvas.width = videoElement.videoWidth;
                            canvas.height = videoElement.videoHeight;
                        }

                        videoElement.currentTime = 1;
                    };

                    videoElement.onseeked = () => {
                        const canvas = canvasRef.current;
                        const ctx = canvas?.getContext("2d");
                        if (canvas && ctx) {
                            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                            URL.revokeObjectURL(url);
                            setPreviewImage(canvas.toDataURL());
                        }
                    };
                }
            }
        } else {
            setPreviewImage(undefined);
        }

        if (onChange) {
            onChange(event);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-52 border border-[#dbdce0] text-black">
                <label htmlFor="image" className="text-center flex gap-5 items-center cursor-pointer">
                    {previewImage ? (
                        isVideoFile(previewImage) ? (
                            <img
                                className="h-20 w-20 sm:h-28 sm:w-28 object-cover"
                                src={"/assets/videoThumbnail.png"}
                                alt="Video Thumbnail"
                            />
                        ) : (
                            <img className="h-20 w-20 sm:h-28 sm:w-28 object-cover" src={previewImage} alt="Image Preview" />
                        )
                    ) : (
                        <IconPhoto className="h-20 w-20 sm:h-28 sm:w-28" />
                    )}
                    <div className="gap-2 flex flex-col text-sm leading-6 items-center text-gray-600">
                        <IconCloudUpload />
                        <label className="relative cursor-pointer font-semibold text-indigo-600 outline-none">
                            <span className="underline">Upload a file</span>
                            <input type="file" id="image" onChange={handleFileChange} hidden ref={ref} {...props} />
                        </label>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </label>
            </div>
            <video ref={videoRef} className="hidden" />
            <canvas ref={canvasRef} className="hidden" />
        </>
    );
});

export default FileInput;
