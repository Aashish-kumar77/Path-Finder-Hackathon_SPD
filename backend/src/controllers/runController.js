const supabase = require('../config/supabase');
const turf = require('@turf/turf');

// 1. Start Run
exports.startRun = async (req, res) => {
  res.status(200).json({ success: true, message: 'Run started!' });
};

// 2. End Run (The one with Turf logic)
exports.endRun = async (req, res) => {
  try {
    const { userId, path } = req.body;
    if (!path || path.length < 2) return res.status(400).json({ success: false });

    const flippedCoords = path.map(p => [p, p]);
    const line = turf.lineString(flippedCoords);
    const buffered = turf.buffer(line, 0.05, { units: 'kilometers' });

    const { data, error } = await supabase.from('runs').insert([{
      user_id: userId || '00000000-0000-0000-0000-000000000000',
      territory_geojson: buffered,
      polyline_geojson: line,
      start_time: new Date().toISOString()
    }]).select();

    if (error) throw error;
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Get All Runs
exports.getAllRuns = async (req, res) => {
  try {
    const { data, error } = await supabase.from('runs').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};