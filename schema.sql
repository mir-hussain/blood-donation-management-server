-- Drop tables if they exist (optional, for development)
-- DROP TABLE IF EXISTS Request_Donations, Donations, Requests, Storage, Receptionist, Admin, Hospital, User;

-- Create the User table
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    dob DATE NOT NULL,
    role ENUM('admin', 'user', 'receptionist') NOT NULL,
    blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NULL,
    last_donated DATE NULL, -- New column for last donated date
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Admin table
CREATE TABLE Admin (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);

-- Create the Receptionist table
CREATE TABLE Receptionist (
    id INT PRIMARY KEY,
    assigned_hospital_id INT,
    FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_hospital_id) REFERENCES Hospital(id) ON DELETE SET NULL
);

-- Create the Hospital table
CREATE TABLE Hospital (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL, -- City column
    branch VARCHAR(100) NULL, -- New optional branch column
    contact_number VARCHAR(20),
    created_by_admin_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by_admin_id) REFERENCES Admin(id) ON DELETE SET NULL
);

-- Create the Storage table
CREATE TABLE Storage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT NOT NULL,
    blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES Hospital(id) ON DELETE CASCADE
);

-- Create the Requests table
CREATE TABLE Requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    blood_type_requested ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    hospital_id INT NULL,
    quantity_requested INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'fulfilled') DEFAULT 'pending',
    request_date DATE NOT NULL,
    is_public_request BOOLEAN DEFAULT FALSE,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL, -- Added city column
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (hospital_id) REFERENCES Hospital(id) ON DELETE SET NULL
);

-- Create the Donations table
CREATE TABLE Donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hospital_id INT NULL,
    blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    donation_date DATE NOT NULL,
    quantity_donated INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (hospital_id) REFERENCES Hospital(id) ON DELETE SET NULL
);

-- Create the Request_Donations table
CREATE TABLE Request_Donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    donation_id INT NOT NULL,
    quantity_donated INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES Requests(id) ON DELETE CASCADE,
    FOREIGN KEY (donation_id) REFERENCES Donations(id) ON DELETE CASCADE
);
