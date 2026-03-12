import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import Avatar from '../Avatar';
import s from './Layout.module.css';

const TC: Record<string, string> = { Diamond: '#00d4ff', Platinum: '#a855f7', Gold: '#f5c842', Silver: '#C0C0C0', Bronze: '#CD7F32' };

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className={s.shell}>
      <nav className={s.nav}>
        <NavLink to="/app/play" className={s.logo}>Knight<span>OS</span></NavLink>
        <div className={s.links}>
          {[
            { to: '/app/play',        l: '♟  Play'        },
            { to: '/app/puzzles',     l: '🧩 Puzzles'      },
            { to: '/app/friends',     l: '👥 Friends'      },
            { to: '/app/leaderboard', l: '🏆 Leaderboard'  },
            { to: '/app/profile',     l: '📊 Profile'      },
            { to: '/app/pricing',     l: '💎 Premium'      },
          ].map(({ to, l }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `${s.tab}${isActive ? ' ' + s.active : ''}`}>{l}</NavLink>
          ))}
        </div>
        {user && (
          <div className={s.right}>
            <div className={s.chip}>
              <Avatar avatar={user.avatar} username={user.username} size={28} className={s.av} />
              <div>
                <div className={s.un}>{user.username}</div>
                <div className={s.elo} style={{ color: TC[user.rankTier] || 'var(--gold)' }}>{user.rating} ELO</div>
              </div>
            </div>
            <span className="badge badge-gold" style={{ color: TC[user.rankTier], fontSize: '.62rem' }}>{user.rankTier}</span>
            <button className="btn btn-ghost btn-sm" onClick={async () => { await logout(); nav('/'); }}>Sign Out</button>
          </div>
        )}
      </nav>
      <main className={s.main}><Outlet /></main>
    </div>
  );
}
