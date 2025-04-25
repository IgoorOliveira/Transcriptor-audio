import { UploadIcon, VideoIcon, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import axios from "axios";
import { useTranscriptionStore } from "../../store/transcriptionStore";

export function UploadVideo() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { setTranscript } = useTranscriptionStore();
  
  const handleTranscribe = async () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const resp = await axios.post('/transcribe', form, {
      headers: {},
      responseType: 'json'
    });
    const segments: { time: string; text: string }[] = resp.data;
    setTranscript(segments);
    await axios.post('/history', { segments });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith("video/")) {
        const video = document.createElement("video");
        const url = URL.createObjectURL(selectedFile);

        video.src = url;
        video.addEventListener("loadedmetadata", () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          video.currentTime = 1;

          video.addEventListener("seeked", () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (!blob) return;
              const previewUrl = URL.createObjectURL(blob);
              setPreview(previewUrl);
              URL.revokeObjectURL(url);
            }, "image/jpeg");
          });
        });
      } else if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
  };

  return (
    <div className="w-full max-w-xl">
      <div
        {...getRootProps()}
        className={`w-full h-60 flex justify-center items-center flex-col rounded-lg cursor-pointer relative overflow-hidden transition-all ${
          preview
            ? "border border-solid bg-background"
            : "border border-dashed hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />

        {preview && file ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              {file.type.startsWith("video/") ? (
                <>
                  <img
                    src={preview}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                      <VideoIcon className="text-white w-8 h-8" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-white/80">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="p-2 rounded-full hover:bg-white/20 text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <UploadIcon className="mb-4 w-10 h-10 text-muted-foreground" />
            <span className="font-medium text-center">
              Arraste e solte seu vídeo aqui, ou clique para selecionar
            </span>
            <small className="text-muted-foreground mt-2 text-center">
              Formatos suportados: MP4, MOV, AVI (até 100MB)
            </small>
          </>
        )}
      </div>

      {file && (
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={handleTranscribe}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Transcrever
          </button>
        </div>
      )}
    </div>
  );
}
