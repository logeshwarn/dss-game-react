import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { verifySignature } from '../utils/dss';

const VerifySignature = () => {
  const { mission, params, message, signature, addScore, resetGame, triggerParticles } = useGame();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    setError('');
    setResult('');

    if (mission !== 3) {
      setError('Complete Mission 2 first!');
      return;
    }

    if (!params.p) {
      setError('Generate keys first!');
      return;
    }

    if (!signature.r || !signature.s) {
      setError('Sign a message first!');
      return;
    }

    const verification = verifySignature(message, signature, params);

    if (verification.valid) {
      setResult('✅ Signature is VALID! Mission Complete! 🎉');
      addScore(50);
      triggerParticles();
      
      setTimeout(() => {
        const playAgain = window.confirm('Congratulations! You completed all missions! Play again?');
        if (playAgain) {
          resetGame();
          setResult('');
        }
      }, 2000);
    } else {
      setError(`❌ Signature is INVALID! ${verification.error || 'Verification failed'}`);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🔐</span> Mission 3: Verify Signature
      </h2>

      <div className="space-y-4 mb-4">
        <div className="bg-white/5 border border-white/20 rounded-lg p-4">
          <div className="text-white/60 text-sm mb-2">Current Message:</div>
          <div className="text-white">{message || 'No message yet'}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
            <div className="text-white/60 text-sm mb-2">r value:</div>
            <div className="text-white font-mono">{signature.r || '—'}</div>
          </div>
          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
            <div className="text-white/60 text-sm mb-2">s value:</div>
            <div className="text-white font-mono">{signature.s || '—'}</div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleVerify}
        disabled={mission !== 3}
        className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
          mission !== 3 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/50'
        }`}
      >
        Verify Signature
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mt-4 bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg text-center font-bold"
        >
          {result}
        </motion.div>
      )}
    </motion.div>
  );
};

export default VerifySignature;
