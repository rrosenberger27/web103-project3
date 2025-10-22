import pool from "../config/database.js";

const TshirtController = {
    getAllTshirts: async (req, res) => {
        try {
            const results = await pool.query('SELECT * FROM CustomItem');
            res.status(200).json(results.rows);
        } catch (error) {
            res.status(500).json({ error: 'Database query error' });
        }
    },
    getTshirtById: async (req, res) => {
        const { id } = req.params;
        try {
            const results = await pool.query('SELECT * FROM CustomItem WHERE id = $1', [id]);
            if (results.rows.length === 0) {
                return res.status(404).json({ error: 'T-shirt not found' });
            }
            res.status(200).json(results.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Database query error' });
        }
    },
    createTshirt : async (req, res) => {
        const { name, logo, stripes, color, fabric_type } = req.body;
        try {
            const results = await pool.query(
                'INSERT INTO CustomItem (name, logo, stripes, color, fabric_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, logo, stripes, color, fabric_type]
            );
            res.status(201).json(results.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Database query error' });
        }
    },
    updateTshirt: async (req, res) => {
        const { id } = req.params;
        const { name, logo, stripes, color, fabric_type } = req.body;
        try {
            const results = await pool.query(
                'UPDATE CustomItem SET name = $1, logo = $2, stripes = $3, color = $4, fabric_type = $5 WHERE id = $6 RETURNING *',
                [name, logo, stripes, color, fabric_type, id]
            );
            if (results.rows.length === 0) {
                return res.status(404).json({ error: 'T-shirt not found' });
            }
            res.status(200).json(results.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Database query error' });
        }
    },
    deleteTshirt: async (req, res) => {
        const { id } = req.params;
        try {
            const results = await pool.query('DELETE FROM CustomItem WHERE id = $1 RETURNING *', [id]);
            if (results.rows.length === 0) {
                return res.status(404).json({ error: 'T-shirt not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Database query error' });
        }
    },

}

export default TshirtController;