const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { v, events, duration_s } = req.body || {};
    if (!events || typeof events !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Increment each event counter for today
    const pipeline = kv.pipeline();
    for (const [event, count] of Object.entries(events)) {
      if (typeof count !== 'number' || count <= 0) continue;
      pipeline.hincrby(`dt:${today}`, event, count);
    }
    // Track total sessions and cumulative duration
    pipeline.hincrby(`dt:${today}`, '_sessions', 1);
    if (typeof duration_s === 'number') {
      pipeline.hincrby(`dt:${today}`, '_duration_s', duration_s);
    }
    // Auto-expire after 90 days
    pipeline.expire(`dt:${today}`, 90 * 86400);
    await pipeline.exec();

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Telemetry error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
};
