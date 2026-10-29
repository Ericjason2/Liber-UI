#!/usr/bin/env node
import { runCli } from "../dist/index.js";

runCli(process.argv).catch((err) => {
  console.error("CLI error:", err);
  process.exit(1);
});
