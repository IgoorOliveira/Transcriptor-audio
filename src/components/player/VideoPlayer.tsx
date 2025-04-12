import { FC } from 'react';
import { UploadVideo } from './UploadVideo';

export const VideoPlayer: FC = () => {
  return (
    <div className="flex justify-center rounded-lg overflow-hidden bg-gradient-to-br from-muted/20 to-muted/30 border border-muted/20">
      <UploadVideo />
    </div>
  );
};

