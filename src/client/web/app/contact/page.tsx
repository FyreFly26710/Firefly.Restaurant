import type { Metadata } from "next";
import { getContactPageData } from "@/features/shop/data/get-contact-page-data";
import { ContactPageView } from "@/features/shop/views/contact-page-view";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Firefly Restaurant contact details, opening hours, and location.",
};

export default async function ContactPage() {
  const page = await getContactPageData();

  return <ContactPageView page={page} />;
}
