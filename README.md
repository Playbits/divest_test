# divest

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Playbits/divest_test.git
   cd divest
   ```
2. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

## Docker Database Setup

1. Copy the example environment file and update as needed:
   ```bash
   cp .env.example .env
   ```
2. Start the database using Docker Compose:
   ```bash
   docker-compose up -d
   ```
3. Run database migrations (
   ```bash
   npx sequelize-cli db:migrate
   ```

## Development Instructions

1. Start the development server:
   ```bash
   yarn dev
   ```
2. Access the application at [http://localhost:3000](http://localhost:3000).
3. Run tests:
   ```bash
   yarn test
   ```
