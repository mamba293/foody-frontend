import 'dotenv/config';
import app from './app.js';
import { initModels } from './models/init-models.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await initModels();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

startServer();
