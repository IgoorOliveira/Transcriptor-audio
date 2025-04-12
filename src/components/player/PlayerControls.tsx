import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { useTranscription } from '../../hooks/useTranscription';
import { FC } from 'react';

export const PlayerControls: FC = () => {
  const { playbackSpeed, updatePlaybackSpeed } = useVideoPlayer();
  const { autoScroll, setAutoScroll } = useTranscription();

  return (
    <div className="bg-muted/10 p-4 rounded-lg border border-muted/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Velocidade:</span>
          <Slider 
            value={[playbackSpeed]}
            min={0.5}
            max={2}
            step={0.25}
            onValueChange={updatePlaybackSpeed}
            className="w-32"
          />
          <span className="text-sm font-mono">{playbackSpeed}x</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Auto-scroll</span>
          <Switch 
            checked={autoScroll} 
            onCheckedChange={setAutoScroll} 
          />
        </div>
      </div>
    </div>
  );
};