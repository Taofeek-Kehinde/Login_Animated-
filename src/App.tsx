// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'exit'>('exit');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const boyRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);

  // Initial animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      animateBoyExit();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const animateBoyExit = () => {
    setIsAnimating(true);
    setAnimationPhase('exit');
    
    // Open door
    if (doorRef.current) {
      doorRef.current.style.transform = 'rotateY(-90deg)';
    }

    // Boy comes out after door opens
    setTimeout(() => {
      if (boyRef.current) {
        boyRef.current.style.left = '250px';
        boyRef.current.style.transition = 'left 1.5s ease-in-out';
      }
    }, 800);

    // Close door after boy exits
    setTimeout(() => {
      if (doorRef.current) {
        doorRef.current.style.transform = 'rotateY(0deg)';
      }
      setIsAnimating(false);
    }, 2500);
  };

  const animateBoyEnter = () => {
    setIsAnimating(true);
    setAnimationPhase('enter');
    
    // Open door
    if (doorRef.current) {
      doorRef.current.style.transform = 'rotateY(-90deg)';
    }

    // Boy enters
    setTimeout(() => {
      if (boyRef.current) {
        boyRef.current.style.left = '50px';
        boyRef.current.style.transition = 'left 1.5s ease-in-out';
      }
    }, 800);

    // Close door after boy enters
    setTimeout(() => {
      if (doorRef.current) {
        doorRef.current.style.transform = 'rotateY(0deg)';
      }
      setIsAnimating(false);
      setShowSuccess(true);
      
      // Reset animation after showing success
      setTimeout(() => {
        setShowSuccess(false);
        // Reset boy position behind door for next animation
        if (boyRef.current) {
          boyRef.current.style.transition = 'none';
          boyRef.current.style.left = '50px';
        }
      }, 3000);
    }, 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    animateBoyEnter();
  };

  const handleSignUp = () => {
    alert('Sign up functionality would go here');
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would go here');
  };

  const resetAnimation = () => {
    if (boyRef.current) {
      boyRef.current.style.transition = 'none';
      boyRef.current.style.left = '50px';
      boyRef.current.style.transform = 'translateY(-50%) scaleX(-1)';
    }
    animateBoyExit();
  };

  return (
    <div className="app-container">
      {/* Left Side - Door and Animation Scene */}
      <div className="left-side">
        <div className="animation-scene">
          <div className="wall">
            {/* Door Frame */}
            <div className="door-frame">
              <div ref={doorRef} className="door">
                <div className="door-handle"></div>
                <div className="door-knob"></div>
              </div>
            </div>
            
            {/* Boy Character */}
            <div 
              ref={boyRef} 
              className="boy"
              style={{ left: '50px', transform: 'translateY(-50%) scaleX(-1)' }}
            ></div>
          </div>
          
          {/* Floor */}
          <div className="floor"></div>
          
          {/* Reset Button */}
          <button 
            className="reset-button"
            onClick={resetAnimation}
            disabled={isAnimating}
          >
            {isAnimating ? 'Animating...' : 'Replay Animation'}
          </button>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="right-side">
        <div className={`login-container ${isAnimating ? 'disabled' : ''}`}>
          <div className="login-card">
            <h1 className="login-title">Login to Dashboard</h1>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isAnimating}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isAnimating}
                  required
                />
              </div>
              
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
                disabled={isAnimating}
              >
                Forgot password
              </button>
              
              <button
                type="submit"
                className="login-button"
                disabled={isAnimating}
              >
                {isAnimating ? (
                  animationPhase === 'enter' ? 'Entering...' : 'Logging in...'
                ) : (
                  'Login'
                )}
              </button>
            </form>
            
            <div className="signup-section">
              <span className="signup-text">Don't have an account</span>
              <button
                type="button"
                className="signup-button"
                onClick={handleSignUp}
                disabled={isAnimating}
              >
                Sign up
              </button>
            </div>
            
            <div className="footer">
              Developed with ❤️ by Code With Kenny
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-message">
          <div className="success-content">
            <h2>Welcome Back!</h2>
            <p>Successfully logged in</p>
            {/* <p className="success-note">Boy has entered the door</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;