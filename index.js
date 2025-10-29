const app = require('./src/server');
const connectDB = require('./src/db/db.connection');
const dotenv = require('dotenv');


dotenv.config();
const PORT = process.env.PORT || 4000;


connectDB()
.then(
     ()=>{
        app.listen(PORT, () => {
            console.log(`🤖 Server listening on port ${PORT}!`);
        });
     }
)
.catch((err) => {
    console.error('❌ Failed to start server:', err);
    
});
