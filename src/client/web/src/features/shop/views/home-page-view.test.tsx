import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { testHomePageData } from "@/test/shop-page-test-data";
import { HomePageView } from "./home-page-view";

describe("HomePageView", () => {
  it("renders the Firefly home page with shop-owned content sections", () => {
    render(<HomePageView page={testHomePageData} />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("heading", { name: "Fixture Firefly" })).toBeVisible();
    expect(screen.getByText("Fixture home tagline.")).toBeVisible();
    expect(screen.getByRole("link", { name: "View fixture menu" })).toHaveAttribute(
      "href",
      "/menu",
    );
    expect(screen.getByRole("heading", { name: "Fixture kitchen story." })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Fixture pillar" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "House favourites." })).toBeVisible();
    expect(screen.getByText("Fixture noodles")).toBeVisible();
  });

  it("renders contact details and weekly hours", () => {
    render(<HomePageView page={testHomePageData} />);

    const contact = screen.getByRole("region", { name: "Come by for the glow." });

    expect(within(contact).getByText("1 Test Lantern Lane")).toBeVisible();
    expect(within(contact).getByRole("link", { name: "07000 000000" })).toHaveAttribute(
      "href",
      "tel:07000000000",
    );
    expect(
      within(contact).getByRole("link", { name: "fixtures@firefly.restaurant" }),
    ).toHaveAttribute("href", "mailto:fixtures@firefly.restaurant");
    expect(within(contact).getByRole("row", { name: "Tue 17:00 - 22:00" })).toBeVisible();
  });
});
