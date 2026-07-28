import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type State =
  | 'idle'
  | 'waiting'
  | 'running'
  | 'running-right'
  | 'running-left'
  | 'jumping'
  | 'review';

const counts: Record<State, number> = {
  idle: 6,
  waiting: 6,
  running: 6,
  'running-right': 8,
  'running-left': 8,
  jumping: 5,
  review: 6,
};

const idleFrameTops = [56, 56, 56, 58, 57, 57];

const Boar: React.FC<{
  state: State;
  x: number;
  y: number;
  width?: number;
  frameRate?: number;
  rotate?: number;
  opacity?: number;
}> = ({state, x, y, width = 660, frameRate = 9, rotate = 0, opacity = 1}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const index = Math.floor((frame / fps) * frameRate) % counts[state];
  const source = `frames/${state}/${String(index).padStart(2, '0')}.png`;
  const idleAlignment = state === 'idle'
    ? (56 - idleFrameTops[index]) * (width / 192)
    : 0;

  return (
    <Img
      src={staticFile(source)}
      style={{
        position: 'absolute',
        left: x,
        top: y + idleAlignment,
        width,
        height: 'auto',
        opacity,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: '50% 70%',
      }}
    />
  );
};

const Caption: React.FC<{
  children: React.ReactNode;
  from?: number;
  size?: number;
  top?: number;
  rotate?: number;
}> = ({children, from = 0, size = 104, top = 150, rotate = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({
    fps,
    frame: Math.max(0, frame - from),
    config: {damping: 10, stiffness: 180, mass: 0.55},
  });

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 45,
        right: 45,
        textAlign: 'center',
        color: '#171918',
        fontFamily: 'Arial Black, Arial, sans-serif',
        fontSize: size,
        fontWeight: 950,
        lineHeight: 0.88,
        letterSpacing: -5,
        textTransform: 'uppercase',
        WebkitTextStroke: '1px #171918',
        transform: `scale(${pop}) rotate(${rotate}deg)`,
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </div>
  );
};

const IDEBackground: React.FC<{shake?: number}> = ({shake = 0}) => {
  const frame = useCurrentFrame();
  const dx = Math.sin(frame * 2.7) * shake;
  const dy = Math.cos(frame * 3.2) * shake;

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 28% 12%, #ffffff 0, #f7f4ed 50%, #ece5d9 100%)',
        transform: `translate(${dx}px, ${dy}px) scale(1.015)`,
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.14,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(74,49,20,.08) 0px, rgba(74,49,20,.08) 1px, transparent 1px, transparent 5px)',
          mixBlendMode: 'multiply',
        }}
      />
    </AbsoluteFill>
  );
};

const INTRO_FRAMES = 225;
const MEME_FRAMES = 792;
const OUTRO_FRAMES = 108;

const TossedText: React.FC<{
  children: React.ReactNode;
  from: number;
  top: number;
  left?: number;
  right?: number;
  size: number;
  rotate?: number;
  inverted?: boolean;
  mono?: boolean;
  wobble?: number;
}> = ({
  children,
  from,
  top,
  left = 55,
  right = 55,
  size,
  rotate = 0,
  inverted = false,
  mono = false,
  wobble = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame: Math.max(0, frame - from),
    config: {damping: 10, stiffness: 190, mass: 0.58},
  });
  const liveRotation = rotate + Math.sin(Math.max(0, frame - from) * 0.14) * wobble;
  const liveY = Math.sin(Math.max(0, frame - from) * 0.19) * wobble * 2.5;

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        opacity: interpolate(enter, [0, 0.35, 1], [0, 1, 1]),
        color: inverted ? '#ffffff' : '#171918',
        fontFamily: mono
          ? 'Menlo, Monaco, monospace'
          : 'Arial Black, Arial, sans-serif',
        fontSize: size,
        fontWeight: 950,
        lineHeight: 0.9,
        letterSpacing: -4,
        textAlign: 'center',
        textTransform: 'uppercase',
        transform: `translate(${interpolate(enter, [0, 1], [rotate > 0 ? 90 : -90, 0])}px, ${interpolate(enter, [0, 1], [-42, liveY])}px) scale(${interpolate(enter, [0, 1], [0.72, 1])}) rotate(${liveRotation}deg)`,
        transformOrigin: '50% 50%',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          padding: inverted ? '15px 27px 19px' : 0,
          borderRadius: inverted ? 22 : 0,
          background: inverted ? '#171918' : 'transparent',
          boxShadow: inverted ? '0 14px 28px rgba(0,0,0,.16)' : 'none',
        }}
      >
        {children}
      </span>
    </div>
  );
};

const CodexIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoPop = spring({
    fps,
    frame,
    config: {damping: 14, stiffness: 145, mass: 0.72},
  });
  const actionPop = spring({
    fps,
    frame: Math.max(0, frame - 201),
    config: {damping: 13, stiffness: 160, mass: 0.65},
  });
  const logoOpacity = interpolate(frame, [0, 7, 84, 92], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const resultOpacity = interpolate(frame, [89, 94, 158, 166], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const actionOpacity = interpolate(frame, [200, 207, 218, 225], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const mascotX = interpolate(frame, [166, 198], [1080, 190], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 0.78, 0.24, 1),
  });

  return (
    <AbsoluteFill>
      <IDEBackground />
      <div
        style={{
          position: 'absolute',
          top: 225,
          left: 0,
          right: 0,
          opacity: logoOpacity,
          textAlign: 'center',
          transform: `scale(${interpolate(logoPop, [0, 1], [0.78, 1])})`,
        }}
      >
        <Img
          src={staticFile('codex-logo.png')}
          style={{width: 310, height: 310, objectFit: 'contain'}}
        />
        <div
          style={{
            marginTop: 24,
            color: '#171918',
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: 112,
            fontWeight: 950,
            lineHeight: 0.9,
            letterSpacing: -5,
          }}
        >
          CODEX
        </div>
      </div>
      <div style={{opacity: logoOpacity}}>
        <TossedText from={6} top={790} left={70} right={290} size={60} rotate={-3}>
          ДОБАВИЛ ПИТОМЦЕВ
        </TossedText>
        <TossedText
          from={45}
          top={900}
          left={190}
          right={60}
          size={43}
          rotate={2}
        >
          И НАВЫК СОЗДАВАТЬ СВОИХ
        </TossedText>
        <TossedText
          from={51}
          top={1010}
          left={300}
          right={80}
          size={66}
          rotate={3}
          inverted
          mono
        >
          /hatch-pet
        </TossedText>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: resultOpacity,
        }}
      >
        <TossedText
          from={92}
          top={350}
          left={55}
          right={220}
          size={96}
          rotate={-3}
          wobble={0.7}
        >
          Я ПОПРОБОВАЛ
        </TossedText>
        <TossedText
          from={124}
          top={535}
          left={330}
          right={65}
          size={76}
          rotate={3}
          wobble={0.9}
        >
          ВОТ ЧТО
        </TossedText>
        <TossedText
          from={133}
          top={690}
          left={70}
          right={70}
          size={100}
          rotate={-1}
          wobble={0.55}
        >
          ПОЛУЧИЛОСЬ
        </TossedText>
      </div>
      <Boar
        state={frame < 199 ? 'running-left' : 'idle'}
        x={frame < 199 ? mascotX : 190}
        y={690}
        width={700}
        frameRate={frame < 199 ? 13 : 7}
        opacity={interpolate(frame, [165, 169], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />
      <div
        style={{
          position: 'absolute',
          top: 385,
          left: 45,
          right: 45,
          opacity: actionOpacity,
          color: '#171918',
          textAlign: 'center',
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: 98,
          fontWeight: 950,
          lineHeight: 0.92,
          letterSpacing: -5,
          textTransform: 'uppercase',
          transform: `scale(${interpolate(actionPop, [0, 1], [0.84, 1])}) rotate(-1deg)`,
        }}
      >
        ПРОБУЕМ
        <br />
        В ДЕЛЕ
      </div>
      <Sequence durationInFrames={89}>
        <Audio src={staticFile('audio/intro-codex-short.mp3')} playbackRate={1.08} />
      </Sequence>
      <Sequence from={92}>
        <Audio src={staticFile('audio/intro-result.mp3')} />
      </Sequence>
      <Sequence from={166} durationInFrames={28}>
        <Audio src={staticFile('audio/boar-snort.mp3')} playbackRate={0.78} volume={0.95} />
      </Sequence>
    </AbsoluteFill>
  );
};

const InstallOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoEnter = spring({
    fps,
    frame: Math.max(0, frame - 16),
    config: {damping: 11, stiffness: 175, mass: 0.65},
  });
  const nod = Math.sin(frame / 4.2) * 2.2;

  return (
    <AbsoluteFill>
      <IDEBackground />
      <TossedText from={0} top={190} left={65} right={255} size={73} rotate={-3}>
        ЗАБРАТЬ КАБАНЧИКА
      </TossedText>
      <TossedText from={6} top={335} left={320} right={60} size={68} rotate={3}>
        МОЖНО НА
      </TossedText>
      <TossedText from={12} top={455} left={80} right={190} size={92} rotate={-1}>
        ГИТХАБЕ
      </TossedText>
      <div
        style={{
          position: 'absolute',
          top: 455,
          right: 82,
          width: 118,
          height: 118,
          transform: `scale(${interpolate(logoEnter, [0, 1], [0, 1])}) rotate(${interpolate(logoEnter, [0, 1], [18, -5])}deg)`,
        }}
      >
        <Img src={staticFile('github-mark.svg')} style={{width: '100%', height: '100%'}} />
      </div>
      <Boar state="review" x={190} y={650} width={700} frameRate={7} rotate={nod} />
      <div
        style={{
          position: 'absolute',
          left: 38,
          right: 38,
          top: 1300,
          color: '#171918',
          textAlign: 'center',
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: 39,
          fontWeight: 900,
          letterSpacing: -1.5,
          transform: `scale(${interpolate(logoEnter, [0, 1], [0.82, 1])}) rotate(1deg)`,
        }}
      >
        github.com/krasnoperov/pets
      </div>
      <Sequence from={4}>
        <Audio src={staticFile('audio/outro-github.mp3')} />
      </Sequence>
    </AbsoluteFill>
  );
};

const responseAt = 80;

const SpokenCaption: React.FC<{
  children: string;
  duration: number;
  size?: number;
}> = ({children, duration, size = 92}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame: Math.max(0, frame - responseAt),
    config: {damping: 15, stiffness: 180, mass: 0.55},
  });
  const opacity = interpolate(
    frame,
    [responseAt - 1, responseAt + 4, responseAt + duration - 5, responseAt + duration],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        bottom: 310,
        opacity,
        color: '#171918',
        textAlign: 'center',
        fontFamily: 'Arial Black, Arial, sans-serif',
        fontSize: size,
        fontWeight: 950,
        lineHeight: 0.92,
        letterSpacing: -4,
        textTransform: 'uppercase',
        WebkitTextStroke: '1px #171918',
        transform: `scale(${interpolate(enter, [0, 1], [0.9, 1])})`,
      }}
    >
      {children}
    </div>
  );
};

const MemeScene: React.FC<{
  response: string;
  responseDuration: number;
  responseSize?: number;
  activeState: State;
  activeFrameRate?: number;
}> = ({
  response,
  responseDuration,
  responseSize,
  activeState,
  activeFrameRate = 10,
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - responseAt);
  const stateMix = interpolate(frame, [responseAt, responseAt + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 0.78, 0.24, 1),
  });
  const bounce = activeState.startsWith('running')
    ? Math.sin(activeFrame * 0.72) * 8
    : activeState === 'jumping'
      ? Math.sin((Math.min(activeFrame, 42) / 42) * Math.PI) * -115
      : 0;
  const rotate = activeState === 'review'
    ? Math.sin(activeFrame / 4.2) * 2.4
    : activeState.startsWith('running')
      ? Math.sin(activeFrame * 0.36) * 1.8
      : 0;

  return (
    <AbsoluteFill>
      <IDEBackground />
      <Boar
        state="idle"
        x={190}
        y={690}
        width={700}
        frameRate={7}
        opacity={1 - stateMix}
      />
      <Boar
        state={activeState}
        x={190}
        y={690 + bounce}
        width={700}
        frameRate={activeFrameRate}
        rotate={rotate}
        opacity={stateMix}
      />
      <SpokenCaption duration={responseDuration} size={responseSize}>
        {response}
      </SpokenCaption>
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      <IDEBackground />
      <Caption top={465} size={76}>КОГДА ПОПРОСИЛ КОДЕКС</Caption>
      <Caption top={570} size={84} from={5}>«ПО-БЫСТРОМУ»</Caption>
      <Boar state="idle" x={190} y={800} width={700} frameRate={7} />
      <div style={tagStyle}>ПРИНЯЛ ЗАДАЧУ</div>
    </AbsoluteFill>
  );
};

const Ready: React.FC = () => {
  const frame = useCurrentFrame();
  const lean = interpolate(frame, [0, 59], [0, -3]);
  return (
    <AbsoluteFill>
      <IDEBackground />
      <Caption top={475} size={110}>СЕЙЧАС ПОДСКОЧУ</Caption>
      <Boar state="waiting" x={190} y={800} width={700} frameRate={8} rotate={lean} />
      <div style={tagStyle}>ОЦЕНИЛ ОБСТАНОВКУ</div>
    </AbsoluteFill>
  );
};

const Dash: React.FC = () => {
  const frame = useCurrentFrame();
  const bounce = Math.sin(frame * 0.72) * 8;
  const lean = Math.sin(frame * 0.36) * 1.8;

  return (
    <AbsoluteFill>
      <IDEBackground shake={frame > 22 && frame < 98 ? 4 : 0} />
      <Caption top={455} size={150} rotate={-2}>МЕТНУЛСЯ</Caption>
      <Caption top={610} size={65} from={8} rotate={1}>СТРОГО ПО ВОПРОСИКУ</Caption>
      <Boar
        state="running-right"
        x={190}
        y={800 + bounce}
        width={700}
        frameRate={13}
        rotate={lean}
      />
      <div
        style={{
          ...tagStyle,
          transform: `rotate(-2deg) scale(${interpolate(frame, [0, 12], [0, 1], {
            extrapolateRight: 'clamp',
          })})`,
        }}
      >
        ДЕЛОВОЙ ГАЛОП
      </div>
    </AbsoluteFill>
  );
};

const Jump: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = Math.sin((Math.min(frame, 41) / 41) * Math.PI) * -120;
  return (
    <AbsoluteFill>
      <IDEBackground />
      <Caption top={475} size={102}>ОБКАШЛЯЮ</Caption>
      <Caption top={585} size={115} from={5}>ВОПРОСИК</Caption>
      <Boar state="jumping" x={190} y={800 + rise} width={700} frameRate={7} />
      <div style={tagStyle}>БЕЗ ЛИШНЕЙ СУЕТЫ</div>
    </AbsoluteFill>
  );
};

const Chinarom: React.FC = () => {
  const frame = useCurrentFrame();
  const nod = Math.sin(frame / 4.2) * 2.4;
  return (
    <AbsoluteFill>
      <IDEBackground />
      <Caption top={470} size={116}>ВСЁ ЧИН-</Caption>
      <Caption top={595} size={124} from={5}>ЧИНАРЁМ</Caption>
      <Boar state="review" x={190} y={800} width={700} frameRate={7} rotate={nod} />
      <div style={tagStyle}>ВОПРОСИК ЗАКРЫТ</div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const bounce = Math.sin(frame * 0.72) * 8;
  const lean = Math.sin(frame * 0.36) * -1.8;
  const fade = interpolate(frame, [62, 76], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{opacity: fade}}>
      <IDEBackground shake={3} />
      <Caption top={475} size={108}>ОБНЯЛ.</Caption>
      <Caption top={590} size={100} from={4}>ПРИПОДНЯЛ.</Caption>
      <Boar
        state="running-left"
        x={190}
        y={800 + bounce}
        width={700}
        frameRate={13}
        rotate={lean}
      />
      <div style={tagStyle}>КАКУЮ ФРАЗУ ДОБАВИТЬ СЛЕДУЮЩЕЙ?</div>
    </AbsoluteFill>
  );
};

const tagStyle: React.CSSProperties = {
  position: 'absolute',
  left: 120,
  right: 120,
  bottom: 265,
  color: '#1f1b16',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 900,
  fontSize: 30,
  letterSpacing: 6,
  borderTop: '3px solid #1f1b16',
  paddingTop: 19,
};

type TaskCard = {
  title: string;
  subtitle: string;
  complete?: boolean;
  start: number;
};

const taskCards: TaskCard[] = [
  {
    start: 0,
    title: 'Там одна маленькая правка',
    subtitle: 'Дифф на сорок семь файлов',
  },
  {
    start: 132,
    title: 'Назначь короткий созвон по багу',
    subtitle: 'Короткий — всего на час',
  },
  {
    start: 264,
    title: 'Напиши мне браузер с нуля',
    subtitle: 'И не допускай ошибок',
  },
  {
    start: 396,
    title: 'Баг воспроизводится раз в неделю',
    subtitle: 'На демо — с первого раза',
  },
  {
    start: 528,
    title: 'Тесты точно прошли?',
    subtitle: 'Они даже не запускались',
  },
  {
    start: 660,
    title: 'Не трогай рабочий код',
    subtitle: 'Он больше не рабочий',
    complete: true,
  },
];

const Chevron: React.FC<{color?: string}> = ({color = '#ffffff'}) => (
  <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
    <path
      d="M12 18 L23 29 L34 18"
      fill="none"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StatusIcon: React.FC<{complete?: boolean}> = ({complete = false}) => (
  <div
    style={{
      flex: '0 0 auto',
      width: 84,
      height: 84,
      marginLeft: 24,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      background: complete ? '#ccefd8' : '#c9cacc',
    }}
  >
    {complete ? (
      <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
        <path
          d="M10 28.5 L22 40 L44 13"
          fill="none"
          stroke="#00a832"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <Chevron />
    )}
  </div>
);

const cardShell: React.CSSProperties = {
  position: 'absolute',
  left: 46,
  right: 46,
  height: 170,
  boxSizing: 'border-box',
  borderRadius: 68,
  background: 'rgba(249,249,249,.98)',
  border: '1px solid rgba(0,0,0,.08)',
  boxShadow: '0 25px 50px rgba(0,0,0,.16)',
};

const ActiveTaskCard: React.FC<{
  card: TaskCard;
  transform: string;
  opacity?: number;
  zIndex: number;
}> = ({card, transform, opacity = 1, zIndex}) => (
  <div
    style={{
      ...cardShell,
      top: 360,
      zIndex,
      opacity,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 34px 0 48px',
      color: '#202224',
      fontFamily: '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
      transform,
      transformOrigin: '50% 50%',
    }}
  >
    <div style={{maxWidth: 790, minWidth: 0}}>
      <div
        style={{
          fontSize: 38,
          fontWeight: 800,
          letterSpacing: -1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {card.title}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 29,
          color: '#747577',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {card.subtitle}
      </div>
    </div>
    <StatusIcon complete={card.complete} />
  </div>
);

const TaskStack: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const activeIndex = taskCards.reduce(
    (found, card, index) => (frame >= card.start ? index : found),
    0,
  );
  const activeCard = taskCards[activeIndex];
  const localFrame = frame - activeCard.start;
  const transition = activeIndex === 0
    ? 1
    : interpolate(localFrame, [0, 14], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.22, 0.78, 0.24, 1),
      });
  const enter = spring({
    fps,
    frame,
    config: {damping: 16, stiffness: 115, mass: 0.8},
  });
  const stackEnter = interpolate(enter, [0, 1], [-90, 0]);
  const activeLift = activeIndex === 0
    ? 0
    : interpolate(transition, [0, 1], [26, 0]);
  const activeScale = activeIndex === 0
    ? 1
    : interpolate(transition, [0, 1], [0.974, 1]);
  const previousCard = activeIndex > 0 ? taskCards[activeIndex - 1] : null;
  const previousY = interpolate(transition, [0, 1], [0, -190]);
  const previousScale = interpolate(transition, [0, 1], [1, 0.975]);
  const previousOpacity = interpolate(transition, [0, 0.72, 1], [1, 1, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        transform: `translateY(${stackEnter}px)`,
      }}
    >
      {[2, 1].map((layer) => (
        <div
          key={layer}
          style={{
            ...cardShell,
            top: 360 + layer * 24,
            left: 72 + layer * 18,
            right: 72 + layer * 18,
            background: '#f4f4f4',
            boxShadow: '0 22px 36px rgba(0,0,0,.13)',
            zIndex: 3 - layer,
          }}
        />
      ))}
      <ActiveTaskCard
        card={activeCard}
        zIndex={8}
        opacity={activeIndex === 0 ? enter : 1}
        transform={`translateY(${activeLift}px) scale(${activeScale})`}
      />
      {previousCard && localFrame <= 14 ? (
        <ActiveTaskCard
          card={previousCard}
          zIndex={10}
          opacity={previousOpacity}
          transform={`translateY(${previousY}px) scale(${previousScale}) rotate(-1.2deg)`}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          top: 583,
          left: 508,
          width: 64,
          height: 64,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          background: '#c9cacc',
          color: '#ffffff',
          border: '2px solid rgba(255,255,255,.9)',
          boxShadow: '0 4px 7px rgba(0,0,0,.18)',
          zIndex: 11,
        }}
      >
        <Chevron />
      </div>
    </div>
  );
};

const MemeTimeline: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#f5f1e8', overflow: 'hidden'}}>
    <Sequence from={0} durationInFrames={132}>
      <MemeScene
        response="Метнулся кабанчиком"
        responseDuration={51}
        responseSize={78}
        activeState="running-right"
        activeFrameRate={13}
      />
    </Sequence>
    <Sequence from={132} durationInFrames={132}>
      <MemeScene
        response="Обкашлял вопросик"
        responseDuration={36}
        responseSize={88}
        activeState="running"
      />
    </Sequence>
    <Sequence from={264} durationInFrames={132}>
      <MemeScene
        response="Сейчас подскочу"
        responseDuration={46}
        responseSize={100}
        activeState="waiting"
      />
    </Sequence>
    <Sequence from={396} durationInFrames={132}>
      <MemeScene
        response="Вопросик на контроле"
        responseDuration={41}
        responseSize={76}
        activeState="review"
      />
    </Sequence>
    <Sequence from={528} durationInFrames={132}>
      <MemeScene
        response="Всё чин-чинарём"
        responseDuration={48}
        responseSize={94}
        activeState="jumping"
      />
    </Sequence>
    <Sequence from={660} durationInFrames={132}>
      <MemeScene
        response="Обнял-приподнял"
        responseDuration={51}
        responseSize={92}
        activeState="review"
        activeFrameRate={7}
      />
    </Sequence>

    <TaskStack />

    <Sequence from={12}><Audio src={staticFile('audio/user-01.mp3')} /></Sequence>
    <Sequence from={144}>
      <Audio src={staticFile('audio/user-11.mp3')} playbackRate={1.08} />
    </Sequence>
    <Sequence from={276}><Audio src={staticFile('audio/user-02.mp3')} /></Sequence>
    <Sequence from={408}>
      <Audio src={staticFile('audio/user-07.mp3')} playbackRate={1.15} />
    </Sequence>
    <Sequence from={540}><Audio src={staticFile('audio/user-10.mp3')} /></Sequence>
    <Sequence from={672}><Audio src={staticFile('audio/user-12.mp3')} /></Sequence>

    <Sequence from={66} durationInFrames={20}>
      <Audio src={staticFile('audio/boar-snort.mp3')} volume={0.6} />
    </Sequence>
    <Sequence from={80}><Audio src={staticFile('audio/harry-02.mp3')} /></Sequence>
    <Sequence from={198} durationInFrames={20}>
      <Audio src={staticFile('audio/boar-snort.mp3')} volume={0.52} />
    </Sequence>
    <Sequence from={212}><Audio src={staticFile('audio/harry-03.mp3')} /></Sequence>
    <Sequence from={344}><Audio src={staticFile('audio/harry-01.mp3')} /></Sequence>
    <Sequence from={476}><Audio src={staticFile('audio/harry-04.mp3')} /></Sequence>
    <Sequence from={608}><Audio src={staticFile('audio/harry-05.mp3')} /></Sequence>
    <Sequence from={726} durationInFrames={20}>
      <Audio src={staticFile('audio/boar-snort.mp3')} volume={0.56} />
    </Sequence>
    <Sequence from={740}><Audio src={staticFile('audio/harry-06.mp3')} /></Sequence>
  </AbsoluteFill>
);

export const KabanchikVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#e8e8e5', overflow: 'hidden'}}>
    <Sequence from={0} durationInFrames={INTRO_FRAMES}>
      <CodexIntro />
    </Sequence>
    <Sequence from={INTRO_FRAMES} durationInFrames={MEME_FRAMES}>
      <MemeTimeline />
    </Sequence>
    <Sequence from={INTRO_FRAMES + MEME_FRAMES} durationInFrames={OUTRO_FRAMES}>
      <InstallOutro />
    </Sequence>
  </AbsoluteFill>
);

export const KabanchikCover: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#f5f1e8', overflow: 'hidden'}}>
    <IDEBackground />
    <div
      style={{
        position: 'absolute',
        top: 150,
        left: 70,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        transform: 'rotate(-3deg)',
      }}
    >
      <Img
        src={staticFile('codex-logo.png')}
        style={{width: 150, height: 150, objectFit: 'contain'}}
      />
      <div
        style={{
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: 76,
          fontWeight: 950,
          letterSpacing: -4,
          color: '#171918',
        }}
      >
        CODEX
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        top: 390,
        left: 55,
        right: 55,
        color: '#171918',
        fontFamily: 'Arial Black, Arial, sans-serif',
        fontWeight: 950,
        lineHeight: 0.86,
        letterSpacing: -6,
        textTransform: 'uppercase',
      }}
    >
      <div style={{fontSize: 104, transform: 'rotate(2deg) translateX(95px)'}}>
        СОЗДАЛ
      </div>
      <div style={{marginTop: 25, fontSize: 138, transform: 'rotate(-2deg)'}}>
        КАБАНЧИКА
      </div>
    </div>
    <Boar state="running-left" x={125} y={860} width={830} frameRate={13} rotate={-3} />
    <div
      style={{
        position: 'absolute',
        left: 105,
        bottom: 250,
        padding: '18px 30px 22px',
        borderRadius: 25,
        color: '#ffffff',
        background: '#171918',
        fontFamily: 'Menlo, Monaco, monospace',
        fontSize: 58,
        fontWeight: 900,
        letterSpacing: -3,
        transform: 'rotate(3deg)',
        boxShadow: '0 16px 30px rgba(0,0,0,.18)',
      }}
    >
      /hatch-pet
    </div>
  </AbsoluteFill>
);
