import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { testContactPageData } from "@/test/shop-page-test-data";
import { ContactPageView } from "./contact-page-view";

describe("ContactPageView", () => {
  it("renders the public contact page with shop-owned contact details", () => {
    render(<ContactPageView page={testContactPageData} />);

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("heading", { name: "Visit Fixture Firefly." })).toBeVisible();
    expect(screen.getByText("Fixture contact")).toBeVisible();
    expect(screen.getByRole("link", { name: "Call the restaurant" })).toHaveAttribute(
      "href",
      "tel:07000000000",
    );
  });

  it("renders address, phone, email, weekly hours, and location information", () => {
    render(<ContactPageView page={testContactPageData} />);

    const details = screen.getByRole("region", { name: "Contact details" });

    expect(within(details).getByText("1 Test Lantern Lane")).toBeVisible();
    expect(within(details).getByText("Fixture Quarter")).toBeVisible();
    expect(within(details).getByRole("link", { name: "07000 000000" })).toHaveAttribute(
      "href",
      "tel:07000000000",
    );
    expect(
      within(details).getByRole("link", { name: "fixtures@firefly.restaurant" }),
    ).toHaveAttribute("href", "mailto:fixtures@firefly.restaurant");
    expect(within(details).getByRole("row", { name: "Tue 17:00 - 22:00" })).toBeVisible();

    expect(screen.getByRole("heading", { name: "Where to find us" })).toBeVisible();
    expect(screen.getByRole("img", { name: "Fixture map for Firefly Restaurant" })).toBeVisible();
    expect(screen.getByText("Fixture collection")).toBeVisible();
    expect(screen.getByText("Fixture collection note.")).toBeVisible();
  });
});
