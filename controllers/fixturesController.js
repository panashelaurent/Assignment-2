import db from '../models/index.js';
import { fixturesSchema } from '../validation/fixturesValidation.js'
const { fixtures: Fixture } = db;



export const createFixture = async (req, res) => {
    const { fixture_code,day,time } = req.body;
 

    try {
        const { error } = fixturesSchema.validate(req.body, {abortEarly: false});
        if (error) return res.status(400).json({ error: error.details[0].message });

        await Fixture.create(req.body);
        res.status(201).json({ message: 'Fixture created successfully' });

    } catch (error) {
        console.error('Failed to fixture because:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllFixtures = async (req, res) => {
    try {
        const fixtures = await Fixture.findAll();
        res.status(200).json({ success: true, data: fixtures });
    } catch (error) {
        console.error('Failed to fetch fixtures:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteFixture = async (req, res) => {
    try {
        const { id } = req.params;
        const fixture = await Fixture.findByPk(id);
        if (!fixture) {
            return res.status(404).json({ message: 'Fixture not found' });
        }
        await fixture.destroy();
        res.status(200).json({ message: 'Fixture deleted successfully' });
    } catch (error) {
        console.error('Failed to delete fixture:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};