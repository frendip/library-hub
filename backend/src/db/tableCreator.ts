import dbPool from './config.js';

export default async function tableCreator() {
    const client = await dbPool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS readers (
                reader_id SERIAL PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL
            );
        `);
        console.log('Tables readers created successfully.');

        await client.query(`
            CREATE TABLE IF NOT EXISTS books (
                book_id SERIAL PRIMARY KEY,
                author_name VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                quantity INT NOT NULL CHECK (quantity >= 0)
            );
        `);
        console.log('Tables books created successfully.');

        await client.query(`
            CREATE TABLE IF NOT EXISTS issued_books (
                reader_id INT NOT NULL,
                book_id INT NOT NULL,
                PRIMARY KEY (reader_id, book_id),
                FOREIGN KEY (reader_id) REFERENCES readers(reader_id) ON DELETE CASCADE,
                FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
            );
         `);
        console.log('Tables issued_books created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
}

tableCreator();
