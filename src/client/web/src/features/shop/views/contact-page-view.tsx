import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactDetails } from "../components/contact-details";
import { ContactHero } from "../components/contact-hero";
import { ContactLocation } from "../components/contact-location";
import type { ShopContactPageData } from "../types";

type ContactPageViewProps = {
  page: ShopContactPageData;
};

export function ContactPageView({ page }: ContactPageViewProps) {
  return (
    <div className="site-shell">
      <SiteHeader currentPage="contact" />

      <main className="contact-page">
        <ContactHero hero={page.hero} contact={page.contact} />
        <ContactDetails contact={page.contact} />
        <ContactLocation location={page.location} />
      </main>

      <SiteFooter />
    </div>
  );
}
