export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

export function getPackageInstallCommand(manager: PackageManager, pkg: string): string {
  switch (manager) {
    case "pnpm":
      return `pnpm add ${pkg}`;
    case "npm":
      return `npm install ${pkg}`;
    case "yarn":
      return `yarn add ${pkg}`;
    case "bun":
      return `bun add ${pkg}`;
  }
}

export function getCliCommand(manager: PackageManager, args: string): string {
  switch (manager) {
    case "pnpm":
      return `pnpm dlx @liber-ui/cli ${args}`;
    case "npm":
      return `npx @liber-ui/cli ${args}`;
    case "yarn":
      return `yarn dlx @liber-ui/cli ${args}`;
    case "bun":
      return `bunx @liber-ui/cli ${args}`;
  }
}

