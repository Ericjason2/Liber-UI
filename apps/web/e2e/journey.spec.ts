import { test, expect } from "@playwright/test";

test.describe("Phase 3 User Journey: Search, Copy SVG, Download PNG", () => {
  test("completes the full flow: search -> copy SVG -> customize mono -> download PNG", async ({
    page,
    context,
  }) => {
    // Grant clipboard permissions so navigator.clipboard works in headless browser
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // 1. Visit homepage
    await page.goto("/");
    await expect(page).toHaveTitle(/Liber/);

    // 2. Open Search (click search bar)
    const searchBtn = page.getByRole("button", { name: /Search logos, blocks/i });
    await searchBtn.click();

    // 3. Search for "docker" in command palette
    const searchInput = page.getByPlaceholder(/Search logos, blocks, components/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill("docker");

    // 4. Select Docker from search results inside the modal
    const modal = page.locator(".fixed.inset-0");
    await expect(modal).toBeVisible();
    const dockerResult = modal.locator("a, button").filter({ hasText: "Docker" }).first();
    await expect(dockerResult).toBeVisible();
    await dockerResult.click();

    // 5. Verify navigation to /logos/docker
    await expect(page).toHaveURL(/\/logos\/docker/, { timeout: 15000 });
    await expect(page.getByRole("heading", { name: "Docker", level: 1 })).toBeVisible({ timeout: 15000 });

    // 6. Test Copy SVG
    const copySvgBtn = page.getByRole("button", { name: /Copy SVG/i });
    await expect(copySvgBtn).toBeVisible();
    await copySvgBtn.click();
    await expect(page.getByText(/Copied SVG code/i)).toBeVisible();

    // 7. Test variant switching to mono and color customization
    const monoVariantBtn = page.getByRole("button", { name: /mono/i }).first();
    await monoVariantBtn.click();

    // Verify mono color input is visible
    const colorInput = page.locator('input[type="color"]');
    await expect(colorInput).toBeVisible();
    await colorInput.fill("#2563eb");

    // 8. Test Download PNG
    const downloadPromise = page.waitForEvent("download");
    const downloadBtn = page.getByRole("button", { name: /Download PNG/i });
    await downloadBtn.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain("docker-mono");
    expect(download.suggestedFilename()).toContain(".png");

    // 9. Navigate back to Logos catalog
    await page.getByRole("link", { name: "Logos", exact: true }).first().click();
    await expect(page).toHaveURL(/\/logos/);

    // 10. Filter by "Cloud & DevOps"
    const devopsBtn = page.getByRole("button", { name: "Cloud & DevOps" });
    await devopsBtn.click();
    await expect(page.getByText("Docker")).toBeVisible();
  });
});
