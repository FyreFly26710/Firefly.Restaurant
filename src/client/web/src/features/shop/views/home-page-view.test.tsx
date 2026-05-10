import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getHomePageData } from "../data/get-home-page-data";
import { HomePageView } from "./home-page-view";

describe("HomePageView", () => {
  it("renders the Firefly home page with shop-owned content sections", async () => {
    const page = await getHomePageData();

    render(<HomePageView page={page} />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("heading", { name: "Firefly Restaurant" })).toBeVisible();
    expect(screen.getByText("Wok-fired comfort with a steady glow.")).toBeVisible();
    expect(screen.getByRole("link", { name: "View the menu" })).toHaveAttribute("href", "/menu");
    expect(
      screen.getByRole("heading", { name: "Built for bright heat and relaxed tables." }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "High heat, short waits" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "House favourites." })).toBeVisible();
    expect(screen.getByText("Salt and Pepper Chicken Wings")).toBeVisible();
  });

  it("renders contact details and weekly hours", async () => {
    const page = await getHomePageData();

    render(<HomePageView page={page} />);

    const contact = screen.getByRole("region", { name: "Come by for the glow." });

    expect(within(contact).getByText("32 Lantern Lane")).toBeVisible();
    expect(within(contact).getByRole("link", { name: "0161 555 0148" })).toHaveAttribute(
      "href",
      "tel:01615550148",
    );
    expect(within(contact).getByRole("link", { name: "hello@firefly.restaurant" })).toHaveAttribute(
      "href",
      "mailto:hello@firefly.restaurant",
    );
    expect(within(contact).getByRole("row", { name: "Fri 17:00 - 23:00" })).toBeVisible();
  });
});
