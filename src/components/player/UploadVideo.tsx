import { UploadIcon, VideoIcon, MusicIcon, X, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState, useCallback, useRef } from "react";
import { useTranscriptionStore } from "../../store/transcriptionStore";
import { useConversationsStore } from "../../store/conversationStore";
import { api } from "../../lib/api";

export function UploadVideo() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"video" | "audio" | "image" | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  
  const { setTranscript } = useTranscriptionStore();
  const { 
    createConversation, 
    loadConversations, 
    updateConversationProgress,
    setActiveConversation 
  } = useConversationsStore();
  
  const handleTranscribe = async () => {
    if (!file) return;
    
    try {
      setIsTranscribing(true);
      
      const newConversationId = createConversation(file.name, fileType === "audio" ? "audio" : "video");
      
      progressRef.current = 0;
      
      const progressInterval = setInterval(() => {
        const newProgress = progressRef.current + (100 - progressRef.current) * 0.1;
        const progressValue = Math.min(newProgress, 95);
        
        progressRef.current = progressValue;
        setProgress(progressValue);
        
        updateConversationProgress(newConversationId, Math.round(progressValue));
      }, 500);
      
      const form = new FormData();
      form.append('file', file);
      
      const resp = await api.post('/api/transcribe', form, {
        headers: {},
        responseType: 'json'
      });
      console.log("Resposta da transcrição:", resp.data);
      clearInterval(progressInterval);
      setProgress(100);
      updateConversationProgress(newConversationId, 100);
      
      const segments = Array.isArray(resp.data) ? resp.data : 
                      (resp.data && resp.data.segments ? resp.data.segments : 
                      [{ time: "00:00", text: typeof resp.data === 'string' ? resp.data : JSON.stringify(resp.data) }]);
      
      const formattedTranscript = segments.map((segment: any) => ({
        time: segment.time || "00:00",
        text: segment.text || (typeof segment === 'string' ? segment : JSON.stringify(segment))
      }));
      
      setTranscript(formattedTranscript);
      
      const historyId = resp.data && resp.data.historyId ? resp.data.historyId : null;
      
      if (!historyId) {
        // Salvar a transcrição e metadados no histórico
        try {
          await api.post('/users/history', { 
            id: newConversationId,
            title: file.name,
            url: preview || "",
            type: fileType === "audio" ? "audio" : "video",
            segments: formattedTranscript
          });
        } catch (historyError) {
          console.warn("Erro ao salvar histórico, mas a transcrição foi concluída:", historyError);
        }
      }
      
      await loadConversations();
      setActiveConversation(newConversationId);
      
      
      
      setTimeout(() => {
        setIsTranscribing(false);
        setProgress(0);
        progressRef.current = 0;
      }, 500);
      
    } catch (error) {
      console.error("Erro na transcrição:", error);
      setIsTranscribing(false);
      setProgress(0);
      progressRef.current = 0;
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith("video/")) {
        setFileType("video");
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
      } else if (selectedFile.type.startsWith("audio/")) {
        setFileType("audio");
        setPreview(null);
      } else if (selectedFile.type.startsWith("image/")) {
        setFileType("image");
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".mp4v"],
      "audio/*": [".mp3", ".wav", ".ogg", ".mp4a"],
      "video/mp4": [".mp4"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 100 * 1024 * 1024,
    disabled: isTranscribing
  });

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    setFileType(null);
  };

  const getFileTypeIcon = () => {
    switch (fileType) {
      case "audio":
        return <MusicIcon className="text-white w-8 h-8" />;
      case "video":
        return <VideoIcon className="text-white w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-xl">
      <div
        {...getRootProps()}
        className={`w-full h-60 flex justify-center items-center flex-col rounded-lg cursor-pointer relative overflow-hidden transition-all ${
          isTranscribing ? "pointer-events-none" : ""
        } ${
          file
            ? "border border-solid bg-background"
            : "border border-dashed hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />

        {file ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              {fileType === "video" && preview && (
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
              )}
              {fileType === "audio" && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                    <MusicIcon className="text-white w-8 h-8" />
                  </div>
                </div>
              )}
              {fileType === "image" && preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              )}
              
              {isTranscribing && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="absolute inset-0" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="#1e293b" 
                        strokeWidth="8" 
                      />
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * progress) / 100}
                        className="transform -rotate-90 origin-center transition-all duration-300 ease-out"
                      />
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                        {getFileTypeIcon()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-white">
                    <p className="text-lg font-medium mb-1">Transcrevendo...</p>
                    <p className="text-sm text-white/80">
                      {progress.toFixed(0)}% - Processando seu arquivo
                    </p>
                  </div>
                </div>
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
                {!isTranscribing && (
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
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <UploadIcon className="mb-4 w-10 h-10 text-muted-foreground" />
            <span className="font-medium text-center">
              Arraste e solte seu vídeo ou áudio aqui, ou clique para selecionar
            </span>
            <small className="text-muted-foreground mt-2 text-center">
              Formatos suportados: MP4, MOV, AVI, MP3, WAV (até 100MB)
            </small>
          </>
        )}
      </div>

      {file && !isTranscribing && (
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={handleTranscribe}
            disabled={isTranscribing}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isTranscribing ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Transcrevendo...
              </>
            ) : (
              "Transcrever"
            )}
          </button>
        </div>
      )}
    </div>
  );
}