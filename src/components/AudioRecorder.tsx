import { useState } from 'react';
import { Mic, MicOff, Play, Trash2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { AudioPlayer } from './AudioPlayer';
import { useToast } from '@/hooks/use-toast';

interface AudioRecorderProps {
  onAudioReady: (audioBlob: Blob) => void;
  disabled?: boolean;
}

export const AudioRecorder = ({ onAudioReady, disabled = false }: AudioRecorderProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    isRecording,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    clearRecording,
    formatTime,
  } = useAudioRecording();

  const handleStartRecording = async () => {
    try {
      await startRecording();
      toast({
        title: "Recording Started",
        description: "Speak your feedback clearly into the microphone.",
      });
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: error instanceof Error ? error.message : "Failed to start recording",
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    toast({
      title: "Recording Stopped",
      description: "You can now preview your audio or record again.",
    });
  };

  const handleSubmitRecording = async () => {
    if (!audioBlob) return;
    
    setIsSubmitting(true);
    try {
      await onAudioReady(audioBlob);
      clearRecording();
      toast({
        title: "Audio Comment Posted!",
        description: "Your audio feedback has been shared.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload audio comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (audioUrl && audioBlob) {
    return (
      <div className="space-y-3">
        <div className="text-sm font-medium">Audio Preview</div>
        <AudioPlayer src={audioUrl} />
        <div className="flex space-x-2">
          <Button
            onClick={handleSubmitRecording}
            disabled={isSubmitting}
            size="sm"
            className="flex-1"
          >
            <Upload className="w-4 h-4 mr-1" />
            {isSubmitting ? "Uploading..." : "Post Audio Comment"}
          </Button>
          <Button
            onClick={clearRecording}
            variant="outline"
            size="sm"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Record Audio Feedback</div>
      
      {isRecording ? (
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-4 p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-800">
            <div className="flex items-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="font-medium">Recording...</span>
            </div>
            <span className="text-red-600 font-mono">
              {formatTime(recordingTime)}
            </span>
          </div>
          
          <Button
            onClick={handleStopRecording}
            variant="outline"
            size="sm"
            className="w-full border-red-200 text-red-600 hover:bg-red-50"
          >
            <MicOff className="w-4 h-4 mr-1" />
            Stop Recording
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleStartRecording}
          variant="outline"
          size="sm"
          disabled={disabled}
          className="w-full"
        >
          <Mic className="w-4 h-4 mr-1" />
          Start Recording
        </Button>
      )}
      
      <p className="text-xs text-muted-foreground text-center">
        Record audio feedback up to 5 minutes long
      </p>
    </div>
  );
};