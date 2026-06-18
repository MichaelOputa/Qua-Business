import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import VerificationCode from './VerificationCode';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

type AuthModal = 'login' | 'signup' | 'verification' | null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authModal, setAuthModal] = useState<AuthModal>(null);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src="/Qua_Business.jpeg" alt="QUA Business" className="h-10 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              {l.label}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              {userProfile?.avatar_url && (
                <img
                  src={userProfile.avatar_url}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                  title={userProfile?.username || user.email}
                />
              )}
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200"
              >
                <User size={16} />
                {userProfile?.username ? `@${userProfile.username}` : 'Profile'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAuthModal('login')}
                className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={() => setAuthModal('signup')}
                className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200"
              >
                Sign Up
              </button>
            </div>
          )}
        </nav>

        <button
          className="md:hidden text-gray-800 hover:text-blue-600 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                {l.label}
              </a>
            ))}

            {user ? (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    {userProfile?.avatar_url && (
                      <img
                        src={userProfile.avatar_url}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {userProfile?.username ? `@${userProfile.username}` : 'User'}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => { handleProfileClick(); setOpen(false); }}
                      className="flex items-center gap-2 w-full bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-center justify-center"
                    >
                      <User size={16} />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-center justify-center"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setAuthModal('login'); setOpen(false); }}
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors w-full text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModal('signup')}
                  className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity w-full text-center"
                >
                  Sign Up
                </button>
              </>
            )}
            
            <button
              onClick={() => { handleGetStarted(); setOpen(false); }}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity w-full text-center"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}

      {authModal === 'login' && (
        <Login
          onClose={() => setAuthModal(null)}
          onSwitchToSignUp={() => setAuthModal('signup')}
          onSwitchToVerification={() => setAuthModal('verification')}
        />
      )}

      {authModal === 'signup' && (
        <SignUp
          onClose={() => setAuthModal(null)}
          onSwitchToLogin={() => setAuthModal('login')}
          onSwitchToVerification={() => setAuthModal('verification')}
        />
      )}

      {authModal === 'verification' && (
        <VerificationCode
          onClose={() => setAuthModal(null)}
          onSwitchToLogin={() => setAuthModal('login')}
          onSwitchToSignUp={() => setAuthModal('signup')}
        />
      )}
    </header>
  );
}
