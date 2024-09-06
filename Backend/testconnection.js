const pool = require('./db');

(async () => {
  try {
    const client = await pool.connect();
    console.log('Connection successful');
    client.release();
  } catch (err) {
    console.error('Connection error', err);
  } finally {
    await pool.end();
  }
})();

