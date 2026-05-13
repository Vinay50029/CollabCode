export function newRoomCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 8; i += 1) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}
