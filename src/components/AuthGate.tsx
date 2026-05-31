import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { signUpUser, logInUser, getCurrentUser } from '../services/auth';
import type { UserData } from '../services/auth';
import { sendEmailNotification } from '../services/emailjs';
import logo from '../assets/mm orange logo only.png';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(() => getCurrentUser());
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Check auth status on mount
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        if (!email || !password) {
          throw new Error("Please fill in all fields.");
        }
        const loggedIn = await logInUser(email, password);
        setUser(loggedIn);
        // Send email alert on login
        await sendEmailNotification({
          title: 'User Portal Login',
          name: loggedIn.name,
          email: loggedIn.email,
          phone: loggedIn.phone,
          message: `${loggedIn.name} has logged into the MM Tech Academy portal.`,
        }).catch(err => console.warn("Email alert failed: ", err));

        // Dispatch event so analytics knows there's a new session
        window.dispatchEvent(new CustomEvent('auth-changed'));
      } else {
        if (!name || !email || !phone || !password) {
          throw new Error("Please fill in all fields.");
        }
        if (phone.replace(/\D/g, '').length < 10) {
          throw new Error("Please enter a valid 10-digit phone number.");
        }
        const registered = await signUpUser(name, email, phone, password);
        setUser(registered);
        // Send email alert on registration
        await sendEmailNotification({
          title: 'New Portal Registration',
          name: name,
          email: email,
          phone: phone,
          message: `${name} has registered a new profile to access the MM Tech Academy portal.`,
        }).catch(err => console.warn("Email alert failed: ", err));

        window.dispatchEvent(new CustomEvent('auth-changed'));
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If user is authenticated, render the children (main website content)
  if (user) {
    return <>{children}</>;
  }

  // Otherwise, display the premium entry screen
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #120500 0%, #1e1100 50%, #0d0400 100%)',
      overflowY: 'auto',
      padding: '2rem 1rem',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Decorative floating blurred orbs for premium visual effect */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(255, 107, 0, 0.15)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '20%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'rgba(21, 128, 61, 0.12)',
        filter: 'blur(110px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main card */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
        padding: '2.5rem 2.25rem',
        position: 'relative',
        zIndex: 1,
        color: '#fff'
      }}>
        
        {/* Header/Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img src={logo} alt="MM Tech Academy" style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            margin: '0 0 0.5rem 0'
          }}>
            <span style={{ color: '#FF6B00' }}>MM </span>
            <span style={{ color: '#15803d' }}>TECH</span> Academy
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            {isLogin 
              ? "Welcome back! Please log in to access the portal." 
              : "Register your details to gain immediate access to our courses and services."
            }
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '1.75rem'
        }}>
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(null); }}
            style={{
              flex: 1,
              padding: '0.625rem 0',
              borderRadius: '8px',
              border: 'none',
              background: isLogin ? 'rgba(255, 107, 0, 0.9)' : 'transparent',
              color: isLogin ? '#fff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(null); }}
            style={{
              flex: 1,
              padding: '0.625rem 0',
              borderRadius: '8px',
              border: 'none',
              background: !isLogin ? 'rgba(255, 107, 0, 0.9)' : 'transparent',
              color: !isLogin ? '#fff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#f87171',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            lineHeight: 1.4
          }}>
            {error}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          
          {/* Sign Up Fields */}
          {!isLogin && (
            <>
              {/* Full Name */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                  <User size={18} />
                </span>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.75rem',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                    background: 'rgba(0,0,0,0.2)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.95rem',
                    transition: 'border 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,107,0,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              {/* Phone Number */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                  <Phone size={18} />
                </span>
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.75rem',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                    background: 'rgba(0,0,0,0.2)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.95rem',
                    transition: 'border 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,107,0,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </>
          )}

          {/* Email Address */}
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
              <Mail size={18} />
            </span>
            <input
              required
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.75rem',
                borderRadius: '12px',
                border: '1.5px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                outline: 'none',
                fontSize: '0.95rem',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(255,107,0,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
              <Lock size={18} />
            </span>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 3rem 0.85rem 2.75rem',
                borderRadius: '12px',
                border: '1.5px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                outline: 'none',
                fontSize: '0.95rem',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(255,107,0,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.95rem',
              borderRadius: '12px',
              background: '#FF6B00',
              color: 'white',
              fontWeight: 700,
              border: 'none',
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(255, 107, 0, 0.3)'
            }}
            onMouseEnter={e => {
              if(!loading) {
                e.currentTarget.style.background = '#e05a00';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 0, 0.45)';
              }
            }}
            onMouseLeave={e => {
              if(!loading) {
                e.currentTarget.style.background = '#FF6B00';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 107, 0, 0.3)';
              }
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Enter Portal' : 'Register & Enter')}
          </button>
        </form>
      </div>
    </div>
  );
};
