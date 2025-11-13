import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const Badges = () => {
  const { badges } = useGame();

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-2xl border border-gray-700"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🏅</span>
        Badges
      </h3>
      
      <div className="space-y-2 min-h-[100px]">
        <AnimatePresence>
          {badges.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm italic"
            >
              Complete missions to earn badges!
            </motion.p>
          ) : (
            badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ x: 50, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  delay: index * 0.1,
                }}
                className="bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-3 rounded-lg border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105"
              >
                <span className="font-semibold">{badge.name}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Badges;
