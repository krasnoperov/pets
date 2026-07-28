import React from 'react';
import {Composition} from 'remotion';
import {KabanchikCover, KabanchikVideo} from './video';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Kabanchik"
      component={KabanchikVideo}
      durationInFrames={1125}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="KabanchikCover"
      component={KabanchikCover}
      durationInFrames={1}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
