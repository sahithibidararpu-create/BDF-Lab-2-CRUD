CREATE TABLE IF NOT EXISTS book (
  id INTEGER PRIMARY KEY,
  title TEXT,
  author TEXT,
  price INTEGER,
  pages INTEGER
);

INSERT INTO book (title, author, price, pages) VALUES
('Wings of Fire', 'A.P.J. Abdul Kalam', 350, 180),
('The Alchemist', 'Paulo Coelho', 299, 208),
('Atomic Habits', 'James Clear', 499, 320),
('Deep Work', 'Cal Newport', 450, 296),
('Clean Code', 'Robert C. Martin', 650, 464),
('The Pragmatic Programmer', 'Andrew Hunt', 700, 352),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 320, 336),
('Ikigai', 'Hector Garcia', 280, 208);
