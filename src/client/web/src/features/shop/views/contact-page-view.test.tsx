import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContactPageData } from "../data/get-contact-page-data";
import { ContactPageView } from "./contact-page-view";

describe("ContactPageView", () => {
  it("renders the public contact page with shop-owned contact details", async () => {
    const page = await getContactPageData();

    render(<ContactPageView page={page} />);

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("heading", { name: "Visit Firefly Restaurant." })).toBeVisible();
    expect(screen.getByText("Contact, hours, and directions")).toBeVisible();
    expect(screen.getByRole("link", { name: "Call the restaurant" })).toHaveAttribute(
      "href",
      "tel:01615550148",
    );
  });

  it("renders address, phone, email, weekly hours, and location information", async () => {
    const page = await getContactPageData();

    render(<ContactPageView page={page} />);

    const details = screen.getByRole("region", { name: "Contact details" });

    expect(within(details).getByText("32 Lantern Lane")).toBeVisible();
    expect(within(details).getByText("Central Manchester")).toBeVisible();
    expect(within(details).getByRole("link", { name: "0161 555 0148" })).toHaveAttribute(
      "href",
      "tel:01615550148",
    );
    expect(within(details).getByRole("link", { name: "hello@firefly.restaurant" })).toHaveAttribute(
      "href",
      "mailto:hello@firefly.restaurant",
    );
    expect(within(details).getByRole("row", { name: "Sat 12:00 - 23:00" })).toBeVisible();

    expect(screen.getByRole("heading", { name: "Where to find us" })).toBeVisible();
    expect(
      screen.getByRole("img", { name: "Illustrated local map for Firefly Restaurant" }),
    ).toBeVisible();
    expect(screen.getByText("Collection counter")).toBeVisible();
    expect(
      screen.getByText(
        "Weekend dinner service is busiest after 19:00, so collection orders are easiest when placed ahead by phone.",
      ),
    ).toBeVisible();
  });
});
