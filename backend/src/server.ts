// src/server.ts
import app from './app';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on: ${process.env.BACKEND_SERVER_URL ?? `http://localhost:${PORT}`}`);
});
