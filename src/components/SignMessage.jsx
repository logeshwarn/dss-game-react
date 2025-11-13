import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { signMessage } from '../utils/dss';

const SignMessage = () => {
  const { mission, params, message, setMessage, signature, setSignature, addScore, nextMission, triggerParticles } = useGame();
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSign = () => {
    setError('');
    setOutput('');

    if (mission !== 2) {
      setError('Complete Mission 1 first!');
      return;
    }

    if (!params.p) {
      setError('Generate keys first!');
      return;
    }

    if (!message.trim()) {
      setError('Enter a message to sign!');
      return;
    }

    const sig = signMessage(message, params);
    setSignature(sig);
    setOutput(`✍️ Signature generated successfully!\n\nr = ${sig.r}\ns = ${sig.s}`);
    
    addScore(50);
    triggerParticles();
    nextMission();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>✍️</span> Mission 2: Sign Message
      </h2>

      <div className="mb-4">
        <label className="block text-white/80 mb-2 font-medium">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none h-24"
          placeholder="Enter your message to sign..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSign}
        disabled={mission !== 2}
        className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
          mission !== 2 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/50'
        }`}
      >
        Sign Message
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
        >
          ❌ {error}
        </motion.div>
      )}

      {output && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-3"
        >
          <div className="bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg whitespace-pre-wrap text-sm">
            {output}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/20 rounded-lg px-4 py-3">
              <div className="text-white/60 text-xs mb-1">r value:</div>
              <div className="text-white font-mono text-sm">{signature.r}</div>
            </div>
            <div className="bg-white/5 border border-white/20 rounded-lg px-4 py-3">
              <div className="text-white/60 text-xs mb-1">s value:</div>
              <div className="text-white font-mono text-sm">{signature.s}</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SignMessage;
