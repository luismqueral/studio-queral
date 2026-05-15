const { Redis } = require('@upstash/redis');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      console.error('Missing KV env vars. Available:', Object.keys(process.env).filter(k => k.includes('KV') || k.includes('UPSTASH') || k.includes('REDIS')));
      return res.status(500).json({ error: 'KV not configured' });
    }

    const redis = new Redis({ url, token });

    const { v, events, duration_s } = req.body || {};
    if (!events || typeof events !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const key = `dt:${today}`;

    // Increment each event counter for today
    const pipeline = redis.pipeline();
    for (const [event, count] of Object.entries(events)) {
      if (typeof count !== 'number' || count <= 0) continue;
      pipeline.hincrby(key, event, count);
    }
    pipeline.hincrby(key, '_sessions', 1);
    if (typeof duration_s === 'number') {
      pipeline.hincrby(key, '_duration_s', duration_s);
    }
    pipeline.expire(key, 90 * 86400);
    await pipeline.exec();

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Telemetry error:', error.message);
    return res.status(500).json({ error: 'Internal error', detail: error.message });
  }
};
