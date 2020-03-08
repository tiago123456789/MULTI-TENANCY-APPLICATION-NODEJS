CREATE TABLE users (
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE launchs (
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT NOW(),
    dueDate DATE,
    status ENUM("Open", "Due", "Payed") NOT NULL,
    type ENUM("Output", "Input") NOT NULL,
    tenant_id BIGINT NOT NULL,
    FOREIGN KEY(tenant_id) REFERENCES users(id)
);