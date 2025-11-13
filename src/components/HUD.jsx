import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const HUD = () => {
  const { score, mission } = useGame();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 rounded-xl shadow-2xl border border-gray-700 mb-6"
    >
      <motion.div
        key={mission}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 text-lg font-bold"
      >
        <span className="text-2xl">🎯</span>
        <span>Mission {mission}</span>
      </motion.div>

      <motion.div
        key={score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500 }}
        className="flex items-center gap-2 text-lg font-bold"
      >
        <span className="text-2xl">⭐</span>
        <span>Score: {score}</span>
      </motion.div>
    </motion.div>
  );
};

export default HUD;
