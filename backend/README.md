# Sheet Music Backend

This is a Node.js backend for managing sheet music inventory using MySQL database.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Set up MySQL database:

   - Create a MySQL database
   - Run the SQL script in `create_table.sql` to create the table and insert sample data

3. Configure environment variables:

   - Update `.env` file with your MySQL credentials

4. Start the server:
   ```
   npm start
   ```

The server will run on port 3000 (or as specified in .env).

## API Endpoints

- `GET /api/sheetmusic` - Get all sheet music
- `GET /api/sheetmusic/:id` - Get sheet music by ID
- `POST /api/sheetmusic` - Create new sheet music (body: {title, composer, quantity})
- `PUT /api/sheetmusic/:id` - Update sheet music (body: {title, composer, quantity})
- `DELETE /api/sheetmusic/:id` - Delete sheet music

## Database Schema

The `sheet_music` table has the following columns:

- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `title` (VARCHAR(255), NOT NULL)
- `composer` (VARCHAR(255), NOT NULL)
- `quantity` (INT, NOT NULL, DEFAULT 0)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
