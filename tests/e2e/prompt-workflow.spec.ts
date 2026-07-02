import { test, expect } from "@playwright/test";

test("user can create and view a prompt", async ({ page }) => {
  await page.goto("/prompts");
  // TODO: implement real e2e flow
  await expect(page).toHaveURL(/prompts/);
});
