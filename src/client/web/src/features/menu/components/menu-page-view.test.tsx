import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { menuFixture } from "../data/menu-fixture";
import { MenuPageView } from "./menu-page-view";

const menu = {
  categories: menuFixture,
  updatedLabel: "Refreshed hourly",
};

describe("MenuPageView", () => {
  it("renders the menu page with categories, dishes, tags, and prices", () => {
    render(<MenuPageView menu={menu} />);

    expect(screen.getByRole("heading", { name: "The menu." })).toBeVisible();
    expect(screen.getByRole("button", { name: "Appetisers, 8 dishes" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Appetisers" })).toBeVisible();
    expect(screen.getByText("Vegetarian Spring Rolls")).toBeVisible();
    expect(screen.getAllByText("vegetarian")[0]).toBeVisible();
    expect(screen.getAllByText("\u00a34.80")[0]).toBeVisible();
  });

  it("filters dishes from the search box", () => {
    render(<MenuPageView menu={menu} />);

    fireEvent.change(screen.getByLabelText("Search menu"), {
      target: { value: "mapo" },
    });

    expect(screen.getByText("Vegetable Mapo Tofu")).toBeVisible();
    expect(screen.queryByText("Lemon Chicken")).not.toBeInTheDocument();
  });

  it("shows an empty state when no dishes match", () => {
    render(<MenuPageView menu={menu} />);

    fireEvent.change(screen.getByLabelText("Search menu"), {
      target: { value: "not a dish" },
    });

    const status = screen.getByRole("status");

    expect(within(status).getByRole("heading", { name: "No matching dishes." })).toBeVisible();
  });
});
