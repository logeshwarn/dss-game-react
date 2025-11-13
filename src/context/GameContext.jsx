import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [mission, setMission] = useState(1);
  const [badges, setBadges] = useState([]);
  const [params, setParams] = useState({});
  const [signature, setSignature] = useState({ r: null, s: null });
  const [message, setMessage] = useState('');
  const [showParticles, setShowParticles] = useState(false);

  const addScore = (points) => {
    setScore((prev) => {
      const newScore = prev + points;
      checkBadges(newScore);
      return newScore;
    });
  };

  const checkBadges = (currentScore) => {
    const badgeThresholds = [
      { score: 50, name: '🔑 Key Master', id: 'key-master' },
      { score: 100, name: '✍️ Signature Pro', id: 'sig-pro' },
      { score: 150, name: '🔐 DSS Master', id: 'dss-master' },
      { score: 200, name: '🏆 Crypto Legend', id: 'crypto-legend' },
    ];

    badgeThresholds.forEach((badge) => {
      if (currentScore >= badge.score && !badges.some((b) => b.id === badge.id)) {
        setBadges((prev) => [...prev, badge]);
        // Trigger notification or animation
        setTimeout(() => {
          alert(`🎉 New Badge Unlocked: ${badge.name}!`);
        }, 300);
      }
    });
  };

  const nextMission = () => {
    setMission((prev) => (prev < 3 ? prev + 1 : 1));
  };

  const triggerParticles = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 2000);
  };

  const resetGame = () => {
    setMission(1);
    setParams({});
    setSignature({ r: null, s: null });
    setMessage('');
  };

  const value = {
    score,
    mission,
    badges,
    params,
    signature,
    message,
    showParticles,
    addScore,
    setMission,
    nextMission,
    setParams,
    setSignature,
    setMessage,
    triggerParticles,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
