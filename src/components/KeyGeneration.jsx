import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { validateParams, generateKeys } from '../utils/dss';

const KeyGeneration = () => {
  const { mission, params, setParams, addScore, nextMission, triggerParticles } = useGame();
  const [inputs, setInputs] = useState({ p: '', q: '', g: '', x: '' });
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    setError('');
    setOutput('');

    if (mission !== 1) {
      setError('Complete missions in order!');
      return;
    }

    const { p, q, g, x } = inputs;

    if (!p || !q || !g || !x) {
      setError('Please enter all values!');
      return;
    }

    const pNum = parseInt(p);
    const qNum = parseInt(q);
    const gNum = parseInt(g);
    const xNum = parseInt(x);

    const errors = validateParams(pNum, qNum, gNum, xNum);

    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }

    const keys = generateKeys(pNum, qNum, gNum, xNum);
    setParams(keys);
    setOutput(`✅ Keys generated successfully!\n\nPublic Parameters:\np = ${keys.p}\nq = ${keys.q}\ng = ${keys.g}\n\nPrivate Key: x = ${keys.x}\nPublic Key: y = ${keys.y}`);
    
    addScore(50);
    triggerParticles();
    nextMission();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🔑</span> Mission 1: Key Generation
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {['p', 'q', 'g', 'x'].map((field) => (
          <div key={field}>
            <label className="block text-white/80 mb-2 font-medium">
              {field.toUpperCase()}{field === 'x' ? ' (Private Key)' : ''}:
            </label>
            <input
              type="number"
              name={field}
              value={inputs[field]}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGenerate}
        disabled={mission !== 1}
        className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
          mission !== 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/50'
        }`}
      >
        Generate Keys
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
        <motion.pre
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg whitespace-pre-wrap text-sm"
        >
          {output}
        </motion.pre>
      )}
    </motion.div>
  );
};

export default KeyGeneration;
