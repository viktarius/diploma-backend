import express from 'express';
import { InterviewService } from "../core/services";
import { getById } from "../core/services/interview.service";

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await InterviewService.getAll();
    res.send(result);
});

router.post('/', async (req, res) => {
    const {body} = req;
    const result = await InterviewService.add(body);
    res.status(201).send(result);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getById(id);
    res.send(result);
});

export default router;
