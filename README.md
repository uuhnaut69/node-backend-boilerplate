# 🚀 Node Backend Boilerplate Starter

```code
Hello! 🙌
If you find this boilerplate useful, please give it a ⭐️.
```

A modern Node.js backend starter template built with TypeScript, TypeORM, and Hyper Express.

This boilerplate aims to:

- ✨ Reduce setup time for new projects
- 📊 Ensure code consistency and quality
- ⚡ Facilitate rapid development
- 🛡️ Encourage best practices in security, testing, and performance

## Features

- 🏗️ Built with TypeScript
- ⚡ Hyper Express for high-performance HTTP server
- 🗃️ MySQL with TypeORM
- 🔄 Redis for caching
- 🔒 Security middleware configured
- 🐳 Docker support
- ✨ ESLint + Prettier for code quality
- 🧪 Jest + Supertest for testing
- 🪝 Git hooks with Husky
- 📝 Winston for logging
- 💉 Dependency injection with tsyringe
- 🔄 Transaction support

## Prerequisites

- Node.js 20+
- MySQL
- Redis
- pnpm

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

4. Setup docker env

   ```bash
   docker compose up -d
   ```

5. Start development server:

   ```
   pnpm dev
   ```

## Project Structure

```bash
src/
  ├── configs/      # Configuration files
  ├── controllers/  # Request handlers
  ├── middlewares/  # Custom middlewares
  ├── models/       # Database models
  ├── repositories/ # Data access layer
  ├── routes/       # Route definitions
  └── utils/        # Utility functions
tests/
  └── e2e/          # End-to-end tests
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
