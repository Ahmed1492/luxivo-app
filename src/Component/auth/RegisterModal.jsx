import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from '../../redux/authReducer';
import './AuthModal.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const getPasswordStrength = (p) => {
    if (!p) return null;
    if (p.length < 6) return { label: 'Weak', level: 1 };
    if (p.length < 10 || !/[A-Z]/.test(p) || !/\d/.test(p)) return { label: 'Fair', level: 2 };
    return { label: 'Strong', level: 3 };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === form.email)) {
      setError('Email already registered.');
      return;
    }
    const newUser = { name: form.name, email: form.email, password: form.password };
    dispatch(register(newUser));
    dispatch(login(newUser));
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✕</button>

        <div className="auth-header">
          <div className="auth-logo">
            <span>Luxi</span>vo.
          </div>
          <h2>Create account</h2>
          <p className="auth-subtitle">Join us and start shopping</p>
        </div>

        {error && (
          <div className="auth-error-box">
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <PersonOutlineIcon className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <EmailOutlinedIcon className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <LockOutlinedIcon className="input-icon" />
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
              {showPass ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
            </button>
          </div>

          {strength && (
            <div className="password-strength">
              <div className="strength-bars">
                {[1, 2, 3].map((l) => (
                  <div key={l} className={`bar ${strength.level >= l ? `level-${strength.level}` : ''}`} />
                ))}
              </div>
              <span className={`strength-label level-${strength.level}`}>{strength.label}</span>
            </div>
          )}

          <div className="input-group">
            <LockOutlinedIcon className="input-icon" />
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirm"
              placeholder="Confirm password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
            <button type="button" className="toggle-pass" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
            </button>
          </div>

          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={onSwitchToLogin}>Sign in</span>
        </p>
      </div>
    </div>
  );
};
