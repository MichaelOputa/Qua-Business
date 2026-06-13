import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

interface VerificationCodeProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToSignUp: () => void;
}

export default function VerificationCode({
  onClose,
  onSwitchToLogin,
  onSwitchToSignUp,
}: VerificationCodeProps) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState<'email' | 'code'>('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { sendVerificationCode, verifyCode } = useAuth();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendVerificationCode(email);
      setStage('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyCode(email, code);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {stage === 'email' ? 'Enter Your Email' : 'Verify Code'}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            Verification successful! Redirecting...
          </div>
        )}

        {stage === 'email' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <p className="text-sm text-gray-600">
              We'll send you a verification code via email.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-2 text-center text-2xl letter-spacing tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <p className="text-sm text-gray-600">
              Check your email for the 6-digit code.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              onClick={() => setStage('email')}
              className="w-full text-blue-600 font-medium hover:underline"
            >
              Use Different Email
            </button>
          </form>
        )}

        {stage === 'email' && (
          <div className="mt-6 space-y-2 text-center text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
            <p>
              New user?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
