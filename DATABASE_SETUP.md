# Database Setup Guide

This guide explains how to set up the MySQL database for the Lowo Portfolio application.

## Prerequisites

1. **MySQL Server**: Install MySQL 8.0 or later

   - macOS: `brew install mysql`
   - Ubuntu: `sudo apt install mysql-server`
   - Windows: Download from [MySQL official website](https://dev.mysql.com/downloads/mysql/)

2. **Node.js and pnpm**: Ensure you have Node.js 18+ and pnpm installed

## Setup Steps

### 1. Start MySQL Service

```bash
# macOS (with Homebrew)
brew services start mysql

# Ubuntu/Debian
sudo systemctl start mysql

# Windows
# Start MySQL service from Services panel or MySQL Workbench
```

### 2. Create Database

```bash
# Connect to MySQL as root
mysql -u root -p

# Create database
CREATE DATABASE lowo_portfolio;

# Create a user (optional, for better security)
CREATE USER 'lowo_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON lowo_portfolio.* TO 'lowo_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update the database URL:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in `.env`:

```env
# For root user
DATABASE_URL="mysql://root:your_root_password@localhost:3306/lowo_portfolio"

# Or for custom user
DATABASE_URL="mysql://lowo_user:your_secure_password@localhost:3306/lowo_portfolio"
```

### 4. Run Database Migrations

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations to create tables
pnpm db:migrate

# Seed the database with initial data
pnpm db:seed
```

### 5. Verify Setup

```bash
# Open Prisma Studio to view your data
pnpm db:studio
```

## Available Scripts

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with initial data
- `pnpm db:reset` - Reset database (drops all data)
- `pnpm db:studio` - Open Prisma Studio

## Database Schema

The database includes the following tables:

- **User**: Admin users for authentication
- **Event**: Events that can be created and managed
- **Registration**: User registrations for events
- **Gallery**: Images associated with events
- **Video**: Videos associated with events

## Troubleshooting

### Connection Issues

1. **Can't reach database server**: Ensure MySQL is running
2. **Access denied**: Check username/password in DATABASE_URL
3. **Database doesn't exist**: Create the database manually using MySQL CLI

### Migration Issues

1. **Schema drift**: Run `pnpm db:reset` to reset and re-migrate
2. **Permission errors**: Ensure the database user has proper privileges

## Production Considerations

1. **Security**: Use strong passwords and limit user privileges
2. **Backup**: Set up regular database backups
3. **Connection Pooling**: Configure appropriate connection limits
4. **SSL**: Enable SSL connections for production databases
