import app from './app';
import { connect } from './database';
connect();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
