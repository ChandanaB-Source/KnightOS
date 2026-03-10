// Run with: node seed.js
// Seeds 20 realistic chess players into MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) { console.error('No MONGODB_URI in .env'); process.exit(1); }

const UserSchema = new mongoose.Schema({
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  rating:       { type: Number, default: 1200 },
  rankTier:     { type: String, default: 'Silver' },
  avatar:       { type: String, default: '♟' },
  country:      { type: String, default: 'IN' },
  isOnline:     { type: Boolean, default: false },
  isPremium:    { type: Boolean, default: false },
  stats: {
    gamesPlayed: { type: Number, default: 0 },
    wins:        { type: Number, default: 0 },
    losses:      { type: Number, default: 0 },
    draws:       { type: Number, default: 0 },
    winStreak:   { type: Number, default: 0 },
    bestStreak:  { type: Number, default: 0 },
  },
  ratingHistory: [{ rating: Number, date: Date }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

function getRankTier(rating) {
  if (rating >= 2200) return 'Diamond';
  if (rating >= 1800) return 'Platinum';
  if (rating >= 1400) return 'Gold';
  if (rating >= 1000) return 'Silver';
  return 'Bronze';
}

const PLAYERS = [
  { username: 'Magnus_Clone',   email: 'magnus@chess.com',   rating: 2687, wins: 1842, losses: 312,  draws: 201, avatar: '♔', country: 'NO' },
  { username: 'DarkBishop99',   email: 'dark@chess.com',     rating: 2341, wins: 934,  losses: 287,  draws: 156, avatar: '♗', country: 'RU' },
  { username: 'QueenSlayer_X',  email: 'queen@chess.com',    rating: 2198, wins: 721,  losses: 298,  draws: 89,  avatar: '♛', country: 'US' },
  { username: 'KnightRider47',  email: 'knight@chess.com',   rating: 2087, wins: 612,  losses: 334,  draws: 112, avatar: '♞', country: 'IN' },
  { username: 'PawnStorm_Pro',  email: 'pawn@chess.com',     rating: 1967, wins: 534,  losses: 289,  draws: 76,  avatar: '♟', country: 'DE' },
  { username: 'CastleKing_IN',  email: 'castle@chess.com',   rating: 1876, wins: 489,  losses: 301,  draws: 98,  avatar: '♜', country: 'IN' },
  { username: 'SilentRook',     email: 'rook@chess.com',     rating: 1798, wins: 423,  losses: 278,  draws: 67,  avatar: '♖', country: 'FR' },
  { username: 'BlitzMaster99',  email: 'blitz@chess.com',    rating: 1743, wins: 398,  losses: 312,  draws: 54,  avatar: '⚡', country: 'IN' },
  { username: 'EndgameWizard',  email: 'endgame@chess.com',  rating: 1689, wins: 367,  losses: 298,  draws: 89,  avatar: '♔', country: 'GB' },
  { username: 'TacticalGenius', email: 'tactical@chess.com', rating: 1634, wins: 334,  losses: 267,  draws: 43,  avatar: '♕', country: 'IN' },
  { username: 'OpeningBook_X',  email: 'opening@chess.com',  rating: 1587, wins: 312,  losses: 289,  draws: 67,  avatar: '📖', country: 'BR' },
  { username: 'BulletBrain',    email: 'bullet@chess.com',   rating: 1534, wins: 289,  losses: 312,  draws: 34,  avatar: '🔥', country: 'IN' },
  { username: 'ClassicalMind',  email: 'classical@chess.com',rating: 1489, wins: 267,  losses: 234,  draws: 89,  avatar: '♟', country: 'IT' },
  { username: 'SicilianDragon', email: 'sicilian@chess.com', rating: 1423, wins: 234,  losses: 212,  draws: 56,  avatar: '🐉', country: 'ES' },
  { username: 'FrenchDefender', email: 'french@chess.com',   rating: 1367, wins: 198,  losses: 201,  draws: 45,  avatar: '♞', country: 'FR' },
  { username: 'RuyLopez_Fan',   email: 'ruy@chess.com',      rating: 1312, wins: 167,  losses: 189,  draws: 34,  avatar: '♗', country: 'IN' },
  { username: 'PinMaster2000',  email: 'pin@chess.com',      rating: 1256, wins: 134,  losses: 167,  draws: 23,  avatar: '📌', country: 'JP' },
  { username: 'ForkKing',       email: 'fork@chess.com',     rating: 1198, wins: 112,  losses: 134,  draws: 19,  avatar: '⚔️', country: 'IN' },
  { username: 'CheckmatePro',   email: 'check@chess.com',    rating: 1134, wins: 89,   losses: 112,  draws: 12,  avatar: '♚', country: 'KR' },
  { username: 'NewbieSlayer',   email: 'newbie@chess.com',   rating: 1067, wins: 67,   losses: 98,   draws: 8,   avatar: '🗡️', country: 'IN' },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const passwordHash = await bcrypt.hash('Chess1234', 10);
  let added = 0, skipped = 0;

  for (const p of PLAYERS) {
    const exists = await User.findOne({ username: p.username });
    if (exists) { console.log(`⏭ Skip: ${p.username}`); skipped++; continue; }

    const gamesPlayed = p.wins + p.losses + p.draws;
    // Generate rating history (last 10 entries)
    const ratingHistory = [];
    let r = p.rating - (Math.random() * 200 + 100);
    for (let i = 10; i >= 0; i--) {
      ratingHistory.push({ rating: Math.round(r), date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000) });
      r += (p.rating - r) * 0.3 + (Math.random() * 40 - 20);
    }
    ratingHistory.push({ rating: p.rating, date: new Date() });

    await User.create({
      username: p.username,
      email: p.email,
      passwordHash,
      rating: p.rating,
      rankTier: getRankTier(p.rating),
      avatar: p.avatar,
      country: p.country,
      isOnline: Math.random() > 0.6,
      isPremium: p.rating > 1600,
      stats: {
        gamesPlayed,
        wins: p.wins,
        losses: p.losses,
        draws: p.draws,
        winStreak: Math.floor(Math.random() * 8),
        bestStreak: Math.floor(Math.random() * 15 + 5),
      },
      ratingHistory,
    });
    console.log(`✅ Added: ${p.username} (${p.rating} ELO - ${getRankTier(p.rating)})`);
    added++;
  }

  console.log(`\n🎉 Done! Added: ${added}, Skipped: ${skipped}`);
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
