CRATE TABLE tasks(
  `id` SERIAL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'pending',
);