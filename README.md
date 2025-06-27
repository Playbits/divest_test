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

## 🚧 Challenges Faced During Development

### 1. Sequelize Association Configuration Issues

One of the major challenges encountered during development was with **Sequelize associations**. While Sequelize provides a powerful way to define model relationships, several issues arose:

- **Associations Not Detected**: Despite defining `hasMany`, `belongsTo`, and `hasOne` relationships in model files, Sequelize frequently threw errors like:

  - `SequelizeEagerLoadingError: Model is not associated`
  - `Error: No Sequelize instance passed`

- **Cross-Model Import Conflicts**: Improper import paths or circular dependencies between model files often caused association definitions to silently fail.

- **Inconsistent Model Initialization**: Sequelize associations depend heavily on correct model instantiation and registration. Any deviation in naming or timing broke the relationships.

---

### 2. Workarounds and Solutions

Due to persistent issues with associations, a pragmatic workaround was applied:

#### ✅ Manual Foreign Key Queries

Instead of using `include` or `Model.associations`, I chose to manually query and link related data:

- Fetch parent models like `Order`, `Cart`, or `Transaction`
- Then perform a second query (e.g. `OrderItem.findAll`) using the primary keys
- Finally, use `Array.filter()` or `Array.reduce()` to manually group and nest related data

This approach offered:

- **More control**
- **Fewer runtime errors**
- **Easier debugging**, especially in complex relationships
