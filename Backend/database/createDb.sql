-- Create the database
CREATE DATABASE db;
-- Switch to the new database
USE db;

CREATE TABLE Roles (
  id CHAR(36) NOT NULL DEFAULT UUID(),
  name VARCHAR(255) NOT NULL,
  privileges JSON,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users (
  id CHAR(36) NOT NULL DEFAULT UUID(),
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role CHAR(36),
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role) REFERENCES Roles(id)
);


CREATE TABLE Posts (
    id CHAR(36) NOT NULL DEFAULT UUID(),
    title VARCHAR(255) NOT NULL,
    body Text NOT NULL,
    author CHAR(36),
    status CHAR(1) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    publishedAt DATETIME,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author) REFERENCES Users(id)
);

CREATE TABLE Comments (
    id CHAR(36) NOT NULL DEFAULT UUID(),
    post CHAR(36),
    username VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    postedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post) REFERENCES Posts(id)
);

CREATE TABLE Replys (
    id CHAR(36) NOT NULL DEFAULT UUID(),
    comment CHAR(36),
    username VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    postedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post) REFERENCES Posts(id)
);