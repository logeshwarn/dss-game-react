import { GameProvider } from './context/GameContext';
import { useGame } from './context/GameContext';
import HUD from './components/HUD';
import Badges from './components/Badges';
import KeyGeneration from './components/KeyGeneration';
import SignMessage from './components/SignMessage';
import VerifySignature from './components/VerifySignature';
import ParticleEffect from './components/ParticleEffect';
import { motion } from 'framer-motion';

function GameContent() {
  const { showParticles } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8 px-4">
      <ParticleEffect show={showParticles} />
      
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center text-white mb-8 drop-shadow-2xl"
        >
          🔐 DSS Signature Game
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <HUD />
            <KeyGeneration />
            <SignMessage />
            <VerifySignature />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Badges />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl text-white"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📖</span> How to Play
              </h3>
              <ol className="space-y-3 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Generate DSS keys with valid parameters (p, q, g, x)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Sign a message using your generated keys</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Verify the signature to complete the mission!</span>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="text-xs text-white/60 mb-2">💡 Example values:</div>
                <div className="text-xs font-mono text-white/90">
                  p = 23, q = 11, g = 2, x = 5
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
