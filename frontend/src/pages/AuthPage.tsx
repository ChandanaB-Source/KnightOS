import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import s from './AuthPage.module.css';

const FLAGS = ['🌍','🇮🇳','🇺🇸','🇬🇧','🇩🇪','🇫🇷','🇯🇵','🇰🇷','🇧🇷','🇷🇺','🇨🇳','🇦🇺','🇨🇦'];

export default function AuthPage() {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<'login'|'register'>(params.get('mode') === 'login' ? 'login' : 'register');
  const [form, setForm] = useState({ username: '', email: '', password: '', country: '🌍' });
  const [showPwd, setShowPwd] = useState(false);
  const { login, register, isLoading, error, clearError, isAuthenticated, loadDemo } = useAuth();
  const nav = useNavigate();

  useEffect(() => { if (isAuthenticated) nav('/app/play', { replace: true }); }, [isAuthenticated]);

  const upd = (k: string, v: string) => { setForm(f => ({ ...f, [k]: v })); clearError(); };

  const submit = async () => {
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.username, form.email, form.password, form.country);
    } catch(_) {}
  };

  return (
    <div className={s.page}>
      <div className={s.bg}><div className={s.glow1}/><div className={s.glow2}/><div className={s.grid}/></div>
      <button className={`btn btn-ghost btn-sm ${s.back}`} onClick={() => nav('/')}>← Home</button>

      <motion.div className={s.card}
        initial={{ opacity: 0, y: 28, scale: .97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}>

        <div className={s.logo}>♟ Knight<span>OS</span></div>
        <div className={s.tagline}>Climb the ranks. Beat the AI. Dominate the board.</div>

        {/* Tabs */}
        <div className={s.tabs}>
          <button className={`${s.tab}${mode==='register'?' '+s.active:''}`} onClick={()=>{setMode('register');clearError();}}>Create Account</button>
          <button className={`${s.tab}${mode==='login'  ?' '+s.active:''}`} onClick={()=>{setMode('login');clearError();}}>Sign In</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mode} className={s.form}
            initial={{ opacity: 0, x: mode==='login' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .18 }}>

            {mode === 'register' && (
              <div className={s.field}>
                <label className={s.label}>Username</label>
                <input className={`input${error?.toLowerCase().includes('user')||error?.toLowerCase().includes('letter') ? ' err' : ''}`}
                  placeholder="GrandMaster_X" value={form.username} maxLength={20}
                  onChange={e => upd('username', e.target.value)}
                  onKeyDown={e => e.key==='Enter' && submit()} />
                <span className={s.hint}>3–20 chars · letters, numbers, underscores</span>
              </div>
            )}

            <div className={s.field}>
              <label className={s.label}>Email</label>
              <input className={`input${error?.toLowerCase().includes('email') ? ' err' : ''}`}
                type="email" placeholder="you@example.com" value={form.email}
                onChange={e => upd('email', e.target.value)}
                onKeyDown={e => e.key==='Enter' && submit()} />
            </div>

            <div className={s.field}>
              <label className={s.label}>Password</label>
              <div style={{ position: 'relative' }}>
                <input className={`input${error?.toLowerCase().includes('password')||error?.toLowerCase().includes('minimum') ? ' err' : ''}`}
                  type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password}
                  style={{ paddingRight: 44 }}
                  onChange={e => upd('password', e.target.value)}
                  onKeyDown={e => e.key==='Enter' && submit()} />
                <button type="button" className={s.eye} onClick={() => setShowPwd(v => !v)}>{showPwd ? '🙈' : '👁'}</button>
              </div>
              {mode==='register' && <span className={s.hint}>Min 8 chars · 1 uppercase · 1 number</span>}
            </div>

            {mode==='register' && (
              <div className={s.field}>
                <label className={s.label}>Country</label>
                <div className={s.flags}>
                  {FLAGS.map(f => (
                    <button key={f} type="button"
                      className={`${s.flag}${form.country===f ? ' '+s.flagOn : ''}`}
                      onClick={() => upd('country', f)}>{f}</button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <motion.div className={s.errBox} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                ⚠ {error}
              </motion.div>
            )}

            <button className={`btn btn-gold ${s.submitBtn}`} onClick={submit} disabled={isLoading}>
              {isLoading ? <span className="spinner" /> : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>

            <div className={s.or}><span>or</span></div>

            <button className={`btn btn-outline ${s.submitBtn}`} onClick={loadDemo}>
              ♟ Try Demo Account — No signup needed
            </button>
          </motion.div>
        </AnimatePresence>

        <div className={s.strip}>
          {[['Free','Forever'],['47K','Players'],['99.9%','Uptime']].map(([v,l]) => (
            <div key={l} className={s.stripStat}><strong>{v}</strong><span>{l}</span></div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
