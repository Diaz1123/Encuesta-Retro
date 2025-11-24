import React, { useState, useEffect, useRef } from 'react';
import { AvatarWoman, AvatarMan, AvatarRobot, AvatarAI } from './components/Avatars';
import { t, SURVEY_QUESTIONS } from './constants';

// --- Types ---
type GameState = 'start' | 'profile' | 'questions' | 'results';
type AvatarId = 'woman' | 'man' | 'robot' | 'ai';

interface PlayerData {
  name: string;
  institution: string;
  experience: string;
  avatar: AvatarId | null;
  surveyAnswers: Record<string, number | null>;
}

// --- Colors Constants for Tailwind (Reference) ---
// Red: #E52521
// Blue: #049CD8
// Yellow: #FBD000
// Green: #43B047

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerData, setPlayerData] = useState<PlayerData>({
    name: '',
    institution: '',
    experience: '',
    avatar: null,
    surveyAnswers: Object.fromEntries(SURVEY_QUESTIONS.map(q => [q.id, null]))
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Audio effect simulation refs (optional for future expansion)
  const beepRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    // Placeholder for interaction sound
  };

  const avatarOptions: { id: AvatarId; component: React.FC<{ className?: string }>; label: string }[] = [
    { id: 'woman', component: AvatarWoman, label: t('woman') },
    { id: 'man', component: AvatarMan, label: t('man') },
    { id: 'robot', component: AvatarRobot, label: t('robot') },
    { id: 'ai', component: AvatarAI, label: t('ai') }
  ];

  const handleStart = () => {
    playSound();
    setGameState('profile');
  };

  const handleProfileComplete = () => {
    playSound();
    if (
      !playerData.name.trim() || 
      !playerData.institution.trim() ||
      !playerData.experience.trim() ||
      !playerData.avatar
    ) {
      setErrorMsg(t('fillAllFieldsAlert'));
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    setErrorMsg(null);
    setGameState('questions');
  };

  const handleFinishSurvey = () => {
    playSound();
    const allAnswered = Object.values(playerData.surveyAnswers).every(answer => answer !== null);
    if (!allAnswered) {
      setErrorMsg(t('fillAllFieldsAlert'));
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    setGameState('results');
  };

  const updateSurveyAnswer = (questionId: string, answerIndex: number) => {
    playSound();
    setPlayerData(prev => ({
      ...prev,
      surveyAnswers: {
        ...prev.surveyAnswers,
        [questionId]: answerIndex
      }
    }));
  };

  const resetGame = () => {
    playSound();
    setGameState('start');
    setPlayerData({
      name: '',
      institution: '',
      experience: '',
      avatar: null,
      surveyAnswers: Object.fromEntries(SURVEY_QUESTIONS.map(q => [q.id, null]))
    });
  };

  const handleDownloadReport = () => {
    playSound();
    const timestamp = new Date().toLocaleString();
    
    // Create text content
    let reportContent = `
================================================================
             ★  ARCADE AI SURVEY - MISSION REPORT  ★             
================================================================

DATE: ${timestamp}

[ PILOT DATA ]
--------------
NAME:        ${playerData.name.toUpperCase()}
INSTITUTION: ${playerData.institution.toUpperCase()}
EXPERIENCE:  ${playerData.experience.toUpperCase()}
AVATAR:      ${playerData.avatar?.toUpperCase() || 'UNKNOWN'}

[ MISSION LOG ]
---------------`;

    SURVEY_QUESTIONS.forEach((q, idx) => {
      const answerIdx = playerData.surveyAnswers[q.id];
      const answerText = answerIdx !== null && answerIdx !== undefined 
        ? q.options[answerIdx] 
        : 'NO DATA';
      
      reportContent += `\n\n${idx + 1}. ${q.question}\n   ► ${answerText}`;
    });

    reportContent += `\n\n================================================================\n`;
    reportContent += `                  END OF TRANSMISSION\n`;
    reportContent += `================================================================`;

    // Trigger download
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MISSION_REPORT_${playerData.name.replace(/[^a-z0-9]/gi, '_').toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- Render Components ---

  const Header = () => (
    <div className="w-full bg-black border-b-4 border-[#E52521] p-4 flex justify-between items-center shadow-[0px_4px_0px_0px_rgba(229,37,33,0.5)] z-20 sticky top-0">
      <div className="flex items-center gap-2">
         <div className="w-4 h-4 bg-[#FBD000] animate-pulse"></div>
         <span className="text-[#FBD000] font-arcade text-xs md:text-sm tracking-widest">ARCADE.SYS</span>
      </div>
      <div className="text-[#049CD8] font-retro text-xl">CREDITS: 99</div>
    </div>
  );

  const RetroButton = ({ onClick, color = 'green', children, className = '' }: any) => {
    const colors = {
      green: 'bg-[#43B047] hover:bg-[#368f3a] text-white shadow-[6px_6px_0px_0px_#000]',
      red: 'bg-[#E52521] hover:bg-[#c41e1a] text-white shadow-[6px_6px_0px_0px_#000]',
      yellow: 'bg-[#FBD000] hover:bg-[#d4b000] text-black shadow-[6px_6px_0px_0px_#000]',
      blue: 'bg-[#049CD8] hover:bg-[#037bad] text-white shadow-[6px_6px_0px_0px_#000]',
    };
    
    return (
      <button
        onClick={onClick}
        className={`
          ${colors[color as keyof typeof colors]} 
          border-4 border-black px-6 py-4 font-arcade text-xs md:text-sm uppercase tracking-wider
          active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_0px_#000] transition-all
          ${className}
        `}
      >
        {children}
      </button>
    );
  };

  const ErrorBanner = () => (
    <div className={`
      fixed top-20 left-1/2 -translate-x-1/2 z-50
      bg-[#E52521] text-white font-arcade text-xs p-4 border-4 border-white shadow-[8px_8px_0px_0px_#000]
      transition-opacity duration-300 ${errorMsg ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <span className="animate-pulse mr-2">⚠</span>
      {errorMsg}
    </div>
  );

  // --- Screens ---

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center relative overflow-hidden font-retro">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#222_0%,_#000_100%)]"></div>
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(#049CD8 2px, transparent 2px), linear-gradient(90deg, #049CD8 2px, transparent 2px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)'
        }}></div>

        <div className="z-10 text-center p-4">
            <h1 className="font-arcade text-4xl md:text-6xl text-[#FBD000] mb-6 drop-shadow-[4px_4px_0_#E52521] leading-tight">
              {t('triviaTitle')}
            </h1>
            <p className="font-retro text-2xl md:text-3xl text-[#049CD8] mb-12 animate-pulse">
              {t('triviaSubtitle')}
            </p>
            
            <RetroButton color="red" onClick={handleStart} className="text-lg md:text-xl py-6 px-10 animate-bounce">
              {t('insertCoinText')}
            </RetroButton>
            
            <div className="mt-16 text-[#666] font-retro text-lg">
              © 2024 AI ARCADE CORP. ALL RIGHTS RESERVED.
            </div>
        </div>
      </div>
    );
  }

  if (gameState === 'profile') {
    return (
      <div className="min-h-screen bg-[#111] font-retro pb-20">
        <Header />
        <ErrorBanner />
        
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-[#049CD8] p-1 border-4 border-black shadow-[8px_8px_0px_0px_#000] mb-8">
            <div className="bg-[#111] p-6 md:p-10 border-4 border-black text-center">
              <h2 className="font-arcade text-[#FFF] text-lg md:text-xl mb-8 uppercase text-shadow">
                {t('registerTitle')}
              </h2>

              {/* Name Input */}
              <div className="mb-6 text-left">
                <label className="block text-[#FBD000] font-arcade text-xs mb-2">
                  {t('nameLabel')}
                </label>
                <input
                  type="text"
                  value={playerData.name}
                  onChange={(e) => setPlayerData({...playerData, name: e.target.value})}
                  className="w-full bg-[#222] text-white border-4 border-white p-3 font-retro text-xl focus:outline-none focus:border-[#FBD000] focus:bg-black transition-colors placeholder-gray-600"
                  placeholder="PLAYER 1"
                  autoFocus
                />
              </div>

              {/* Avatar Selection */}
              <div className="mb-6 text-left">
                <label className="block text-[#FBD000] font-arcade text-xs mb-3">
                  {t('selectAvatarLabel')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {avatarOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setPlayerData({...playerData, avatar: opt.id})}
                      className={`
                        relative group p-4 border-4 transition-all duration-200
                        ${playerData.avatar === opt.id 
                          ? 'bg-[#FBD000] border-white shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] scale-105 z-10' 
                          : 'bg-[#222] border-gray-700 hover:border-gray-500 hover:bg-[#333]'}
                      `}
                    >
                      <div className="w-16 h-16 mx-auto mb-2 drop-shadow-md">
                        <opt.component />
                      </div>
                      <div className={`font-arcade text-[10px] uppercase ${playerData.avatar === opt.id ? 'text-black' : 'text-gray-400'}`}>
                        {opt.label}
                      </div>
                      {playerData.avatar === opt.id && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-[#E52521] border-2 border-black"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Institution Input */}
              <div className="mb-6 text-left">
                <label className="block text-[#FBD000] font-arcade text-xs mb-2">
                  {t('institutionLabel')}
                </label>
                <input
                  type="text"
                  value={playerData.institution}
                  onChange={(e) => setPlayerData({...playerData, institution: e.target.value})}
                  className="w-full bg-[#222] text-white border-4 border-white p-3 font-retro text-xl focus:outline-none focus:border-[#FBD000] focus:bg-black transition-colors placeholder-gray-600"
                  placeholder="UNIV / COMPANY..."
                />
              </div>

              {/* Experience Input */}
              <div className="mb-8 text-left">
                <label className="block text-[#FBD000] font-arcade text-xs mb-2">
                  {t('experienceLabel')}
                </label>
                <input
                  type="text"
                  value={playerData.experience}
                  onChange={(e) => setPlayerData({...playerData, experience: e.target.value})}
                  className="w-full bg-[#222] text-white border-4 border-white p-3 font-retro text-xl focus:outline-none focus:border-[#FBD000] focus:bg-black transition-colors placeholder-gray-600"
                  placeholder="YEARS / ROLE..."
                />
              </div>

              <RetroButton color="green" onClick={handleProfileComplete} className="w-full">
                {t('nextButton')}
              </RetroButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'questions') {
    return (
      <div className="min-h-screen bg-[#111] font-retro pb-20">
        <Header />
        <ErrorBanner />

        <div className="max-w-3xl mx-auto p-4 md:p-6">
           {/* Progress Bar */}
           <div className="mb-6 flex items-center gap-4">
              <span className="text-[#FBD000] font-arcade text-xs">LOADING...</span>
              <div className="flex-1 h-4 bg-[#333] border-2 border-[#555] relative">
                  <div 
                    className="h-full bg-gradient-to-r from-[#049CD8] to-[#00FFFF] transition-all duration-500"
                    style={{ width: `${(Object.values(playerData.surveyAnswers).filter(x => x !== null).length / SURVEY_QUESTIONS.length) * 100}%` }}
                  ></div>
              </div>
           </div>

          <div className="space-y-8">
            {SURVEY_QUESTIONS.map((q, idx) => {
              const isAnswered = playerData.surveyAnswers[q.id] !== null;
              // Alternate border colors for fun
              const borderColors = ['border-[#E52521]', 'border-[#43B047]', 'border-[#FBD000]', 'border-[#049CD8]'];
              const currentBorder = borderColors[idx % borderColors.length];

              return (
                <div key={q.id} className={`
                  bg-[#222] border-l-8 ${currentBorder} p-6 shadow-lg transition-all duration-300
                  ${isAnswered ? 'opacity-50 hover:opacity-100 grayscale-[0.5] hover:grayscale-0' : 'opacity-100'}
                `}>
                  <h3 className="text-white text-xl md:text-2xl mb-4 font-bold flex gap-3">
                    <span className="text-[#666] font-arcade text-sm pt-1">0{idx + 1}</span>
                    {q.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, optIdx) => {
                      const isSelected = playerData.surveyAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => updateSurveyAnswer(q.id, optIdx)}
                          className={`
                            text-left p-3 border-2 font-bold text-lg transition-all duration-150 relative overflow-hidden group
                            ${isSelected 
                              ? 'bg-[#E52521] border-[#E52521] text-white shadow-[4px_4px_0_0_#FFF] -translate-y-1' 
                              : 'bg-black border-[#444] text-[#AAA] hover:border-white hover:text-white'}
                          `}
                        >
                          <span className={`inline-block w-6 ${isSelected ? 'text-white' : 'text-[#555] group-hover:text-white'}`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 mb-8">
            <RetroButton color="green" onClick={handleFinishSurvey} className="w-full text-lg py-5">
              {t('finishButton')}
            </RetroButton>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const SelectedAvatar = avatarOptions.find(a => a.id === playerData.avatar)?.component || AvatarRobot;
    
    return (
      <div className="min-h-screen bg-[#111] font-retro pb-20">
        <Header />
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-10">
            <h1 className="font-arcade text-3xl md:text-5xl text-[#FBD000] mb-4 drop-shadow-[4px_4px_0_#E52521] leading-normal">
              {t('thanksTitle')}
            </h1>
            <p className="text-[#049CD8] text-2xl tracking-widest animate-pulse">{t('resultsSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Player Card */}
            <div className="md:col-span-1">
              <div className="bg-[#222] border-4 border-white p-4 text-center shadow-[8px_8px_0px_0px_#43B047] h-full">
                <div className="bg-[#FBD000] w-full aspect-square border-4 border-black mb-4 flex items-center justify-center p-4">
                  <SelectedAvatar className="w-full h-full drop-shadow-lg" />
                </div>
                <div className="bg-black text-white font-arcade py-2 border-2 border-[#555] mb-2 break-words">
                   {playerData.name}
                </div>
                <div className="text-left bg-black p-2 border border-[#444] space-y-2">
                  <div>
                    <span className="text-[#666] text-[10px] font-arcade block">INSTITUCION</span>
                    <span className="text-[#FFF] text-sm leading-tight block">{playerData.institution}</span>
                  </div>
                  <div>
                    <span className="text-[#666] text-[10px] font-arcade block">EXPERIENCIA</span>
                    <span className="text-[#FFF] text-sm leading-tight block">{playerData.experience}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats/Answers */}
            <div className="md:col-span-2">
              <div className="bg-white border-4 border-black p-1 shadow-[8px_8px_0px_0px_#E52521] h-full">
                <div className="border-4 border-black h-full p-6 overflow-y-auto max-h-[500px] bg-[#f0f0f0]">
                   <h3 className="font-arcade text-black text-lg mb-6 border-b-4 border-black pb-2">
                     {t('yourAnswers')}
                   </h3>
                   
                   <div className="space-y-4">
                     {SURVEY_QUESTIONS.map((q, idx) => {
                       const answerIndex = playerData.surveyAnswers[q.id];
                       return (
                         <div key={q.id} className="text-black border-b-2 border-[#ccc] pb-2 last:border-0">
                           <div className="font-bold text-[#E52521] text-lg leading-tight mb-1">
                             <span className="text-xs mr-2 bg-black text-white px-1">Q{idx + 1}</span>
                             {q.question}
                           </div>
                           <div className="pl-8 text-xl">
                             {answerIndex !== null ? q.options[answerIndex] : '-'}
                           </div>
                         </div>
                       );
                     })}
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RetroButton color="blue" onClick={resetGame}>
              {t('playAgainButton')}
            </RetroButton>
            <RetroButton color="yellow" onClick={handleDownloadReport}>
              {t('printButton')}
            </RetroButton>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;