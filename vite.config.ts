import { execSync } from "node:child_process";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function lastCommitDate(): string {
  try {
    const iso = execSync("git log -1 --format=%cI", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (iso) {
      return iso;
    }
  } catch {
    // No commits yet — use today.
  }

  return new Date().toISOString();
}

export default defineConfig({
  base: "/portfolio/",
  plugins: [
    {
      name: "last-updated",
      config() {
        process.env.VITE_LAST_UPDATED = lastCommitDate();
      },
    },
    react(),
  ],
});
