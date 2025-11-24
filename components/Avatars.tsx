import React from 'react';

interface AvatarProps {
  className?: string;
}

export const AvatarWoman: React.FC<AvatarProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
    {/* Hair Back */}
    <rect x="6" y="6" width="20" height="20" fill="#FBD000" rx="2" />
    <rect x="8" y="4" width="16" height="4" fill="#FBD000" />
    
    {/* Face */}
    <rect x="10" y="10" width="12" height="10" fill="#FFCCAA"/>
    
    {/* Fringe/Bangs */}
    <rect x="10" y="8" width="4" height="4" fill="#FBD000"/>
    <rect x="18" y="8" width="4" height="4" fill="#FBD000"/>

    {/* Eyes */}
    <rect x="11" y="14" width="2" height="3" fill="#000"/>
    <rect x="19" y="14" width="2" height="3" fill="#000"/>
    
    {/* Cheeks */}
    <rect x="10" y="16" width="2" height="1" fill="#FF9999"/>
    <rect x="20" y="16" width="2" height="1" fill="#FF9999"/>
    
    {/* Body/Dress */}
    <rect x="10" y="20" width="12" height="8" fill="#E52521"/>
    <rect x="8" y="21" width="2" height="6" fill="#E52521"/>
    <rect x="22" y="21" width="2" height="6" fill="#E52521"/>
    
    {/* Collar/Detail */}
    <rect x="14" y="20" width="4" height="4" fill="#FFF"/>
    
    {/* Gem */}
    <rect x="15" y="21" width="2" height="2" fill="#049CD8"/>
  </svg>
);

export const AvatarMan: React.FC<AvatarProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
    {/* Hair */}
    <path d="M10 6 H22 V10 H24 V14 H22 V12 H10 V14 H8 V10 H10 V6 Z" fill="#4B0082"/>
    
    {/* Face */}
    <rect x="10" y="10" width="12" height="10" fill="#FFCCAA"/>
    
    {/* Bandana */}
    <rect x="9" y="9" width="14" height="2" fill="#E52521"/>
    <rect x="23" y="9" width="3" height="2" fill="#E52521"/> {/* Knot */}
    <rect x="24" y="11" width="1" height="3" fill="#E52521"/> {/* Tail */}

    {/* Eyes */}
    <rect x="12" y="13" width="2" height="2" fill="#000"/>
    <rect x="18" y="13" width="2" height="2" fill="#000"/>
    
    {/* Stubble */}
    <rect x="11" y="17" width="10" height="2" fill="#D2B48C"/>
    
    {/* Body/Gi */}
    <rect x="8" y="20" width="16" height="10" fill="#FFF"/>
    <rect x="10" y="20" width="12" height="4" fill="#049CD8"/> {/* Vest top part */}
    
    {/* Open Chest */}
    <rect x="14" y="20" width="4" height="4" fill="#FFCCAA"/>
    
    {/* Belt */}
    <rect x="10" y="26" width="12" height="2" fill="#000"/>
  </svg>
);

export const AvatarRobot: React.FC<AvatarProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
    {/* Antenna */}
    <rect x="15" y="2" width="2" height="4" fill="#888"/>
    <rect x="14" y="2" width="4" height="2" fill="#E52521"/> {/* Top light */}
    
    {/* Head shape */}
    <rect x="8" y="6" width="16" height="14" fill="#999"/>
    
    {/* Visor Area */}
    <rect x="10" y="10" width="12" height="6" fill="#111"/>
    
    {/* Eyes (Glowing) */}
    <rect x="11" y="11" width="3" height="3" fill="#00FF00"/>
    <rect x="18" y="11" width="3" height="3" fill="#00FF00"/>
    
    {/* Mouth Grille */}
    <rect x="11" y="17" width="10" height="2" fill="#555"/>
    <rect x="12" y="17" width="1" height="2" fill="#333"/>
    <rect x="14" y="17" width="1" height="2" fill="#333"/>
    <rect x="16" y="17" width="1" height="2" fill="#333"/>
    <rect x="18" y="17" width="1" height="2" fill="#333"/>
    
    {/* Neck */}
    <rect x="12" y="20" width="8" height="2" fill="#333"/>
    
    {/* Body */}
    <rect x="6" y="22" width="20" height="10" fill="#049CD8"/>
    
    {/* Chest Light */}
    <rect x="13" y="24" width="6" height="4" fill="#FBD000"/>
  </svg>
);

export const AvatarAI: React.FC<AvatarProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
    {/* Main Frame */}
    <rect x="6" y="6" width="20" height="20" fill="#222" stroke="#444" strokeWidth="2"/>
    
    {/* Circuit Traces */}
    <path d="M16 6 V10 M6 16 H10 M26 16 H22 M16 26 V22" stroke="#049CD8" strokeWidth="2" fill="none"/>
    
    {/* Center Core */}
    <rect x="11" y="11" width="10" height="10" fill="#000" stroke="#049CD8" strokeWidth="1"/>
    
    {/* Eye/Glitch */}
    <rect x="13" y="13" width="6" height="6" fill="#E52521"/>
    <rect x="14" y="14" width="2" height="2" fill="#FFF"/>
    
    {/* Glitch artifacts */}
    <rect x="8" y="8" width="2" height="2" fill="#FBD000" opacity="0.8"/>
    <rect x="22" y="22" width="2" height="2" fill="#00FF00" opacity="0.8"/>
    <rect x="24" y="8" width="2" height="2" fill="#049CD8" opacity="0.8"/>
    <rect x="8" y="24" width="2" height="2" fill="#E52521" opacity="0.8"/>
  </svg>
);
