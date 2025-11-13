# 🔐 DSS Signature Game - React Edition

A modern, interactive educational game to learn Digital Signature Standard (DSS) cryptography. Built with React, Vite, Tailwind CSS, and Framer Motion for smooth animations.

## ✨ Features

### 🎮 Game Mechanics
- **Mission-based progression**: Complete 3 missions to master DSS
- **Score system**: Earn points for completing missions
- **Achievement badges**: Unlock badges as you progress
- **Smooth animations**: Beautiful particle effects and transitions
- **Responsive design**: Works on all screen sizes

### 🔒 Cryptography Features
- **Key Generation**: Generate DSS public/private key pairs with validation
- **Message Signing**: Create digital signatures using DSS algorithm
- **Signature Verification**: Verify the authenticity of signed messages
- **Real-time validation**: Input validation with helpful error messages

### 🎨 Modern UI/UX
- **Glassmorphism design**: Beautiful frosted glass effects
- **Gradient backgrounds**: Vibrant blue-purple gradients
- **Smooth transitions**: Powered by Framer Motion
- **Interactive feedback**: Visual feedback for all actions
- **Particle effects**: Celebration animations on success

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
\`\`\`bash
cd dss-game-react
\`\`\`

2. Install dependencies (already done):
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and visit:
\`\`\`
http://localhost:5173
\`\`\`

## 🎯 How to Play

### Mission 1: Key Generation
1. Enter valid DSS parameters:
   - **p**: A prime number
   - **q**: A prime number that divides (p-1)
   - **g**: Generator
   - **x**: Private key (0 < x < q)

**Example values:**
- p = 23, q = 11, g = 2, x = 5

2. Click "Generate Keys" to create your key pair
3. Earn 50 points and unlock Mission 2!

### Mission 2: Sign Message
1. Enter any message you want to sign
2. Click "Sign Message" to create a digital signature
3. View the generated signature values (r and s)
4. Earn 50 points and unlock Mission 3!

### Mission 3: Verify Signature
1. The message and signature from Mission 2 are displayed
2. Click "Verify Signature" to validate the signature
3. If valid, earn 50 points and complete the game!
4. Play again to improve your score

## 🏆 Badges

Unlock badges as you progress:
- 🔑 **Key Master** (50 points)
- ✍️ **Signature Pro** (100 points)
- 🔐 **DSS Master** (150 points)
- 🏆 **Crypto Legend** (200 points)

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Context API**: Global state management

## 📁 Project Structure

\`\`\`
dss-game-react/
├── src/
│   ├── components/
│   │   ├── HUD.jsx              # Score and mission display
│   │   ├── Badges.jsx           # Achievement badges
│   │   ├── KeyGeneration.jsx   # Mission 1 component
│   │   ├── SignMessage.jsx     # Mission 2 component
│   │   ├── VerifySignature.jsx # Mission 3 component
│   │   └── ParticleEffect.jsx  # Success animations
│   ├── context/
│   │   └── GameContext.jsx     # Global state management
│   ├── utils/
│   │   └── dss.js              # DSS cryptography functions
│   ├── App.jsx                 # Main app component
│   └── index.css               # Global styles
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json
\`\`\`

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build

## 🎨 Customization

### Colors
Edit \`tailwind.config.js\` to customize the color scheme:
\`\`\`javascript
colors: {
  primary: '#00d4ff',  // Cyan
  secondary: '#7a5cff', // Purple
}
\`\`\`

### Animations
Modify animation durations in component files or \`tailwind.config.js\`

## 📚 Learn More

### DSS Algorithm
The Digital Signature Standard uses:
- **Modular exponentiation** for key generation
- **Hash functions** for message digests
- **Modular inverse** for signature generation
- **Mathematical verification** for signature validation

### Resources
- [DSS Wikipedia](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm)
- [NIST FIPS 186-4](https://csrc.nist.gov/publications/detail/fips/186/4/final)

## 🐛 Troubleshooting

### Port already in use
If port 5173 is busy, Vite will automatically use the next available port.

### Module not found
Run \`npm install\` to ensure all dependencies are installed.

### Tailwind styles not loading
Make sure \`postcss.config.js\` and \`tailwind.config.js\` are properly configured.

## 📝 License

This project is for educational purposes.

## 👨‍💻 Author

Created as an enhanced React version of the DSS Signature Demo.

---

**Enjoy learning cryptography! 🔐✨**
