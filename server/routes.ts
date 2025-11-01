import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { users, subscriptions, scamCases, callLogs, transactions, employees } from "@db/schema";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Proxy endpoint for AI Pending Actions
async function proxyAIPendingActions(req: any, res: any) {
  try {
    const response = await fetch('https://api.echofort.ai/api/ai-execution/pending-actions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error('[Proxy] Error fetching AI pending actions:', error);
    res.status(500).json({ 
      actions: [], 
      count: 0,
      error: error.message 
    });
  }
}

// Proxy endpoint for approving/rejecting AI actions
async function proxyAIApproveAction(req: any, res: any) {
  try {
    const response = await fetch('https://api.echofort.ai/api/ai-execution/approve-action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error('[Proxy] Error approving AI action:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
}

export function registerRoutes(app: Express): Server {
  // AI Pending Actions Proxy Routes
  app.get("/api/proxy/ai-pending-actions", proxyAIPendingActions);
  app.post("/api/proxy/ai-approve-action", proxyAIApproveAction);

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
