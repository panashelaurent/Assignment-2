import express from 'express';
import {
    createFixture,
    getAllFixtures,
    deleteFixture
} from '../controllers/fixturesController.js';

const router = express.Router();

router.post('/', createFixture);        
router.get('/', getAllFixtures);          
router.delete('/:id', deleteFixture);      

export default router;