// IMPORT
import { Request, Response, Router } from "express";
import { moodTimeApi } from "../controllers/moodTimeApi";

const router = Router();

// ACTIVE
router.get('/', async (req: Request, res: Response) => {
    // Destructure query parameters from req.query
    const { musicGenre, eventDescription, date } = req.query;

    try {
        // Call moodTimeApi with query parameters
        const result = await moodTimeApi({
            musicGenre: musicGenre as string,
            eventDescription: eventDescription as string,
            date: date as string,
        });

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// EXPORT
export { router };