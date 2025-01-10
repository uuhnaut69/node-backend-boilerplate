import { Server } from "hyper-express";

export default function configureSecurityMiddleware(app: Server) {
  // CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    next();
  });

  // Security headers
  app.use((req, res, next) => {
    res.header("X-Frame-Options", "DENY");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("Referrer-Policy", "no-referrer");
    res.header(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; object-src 'none'"
    );
    next();
  });
}
