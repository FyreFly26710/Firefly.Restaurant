import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactDetails } from "../components/contact-details";
import { ContactHero } from "../components/contact-hero";
import { ContactLocation } from "../components/contact-location";
import styles from "./contact-page-view.module.css";
import type { ShopContactPageData } from "../types";

type ContactPageViewProps = {
  page: ShopContactPageData;
};

export function ContactPageView({ page }: ContactPageViewProps) {
  return (
    <div className={styles["site-shell"]}>
      <SiteHeader currentPage="contact" />

      <main className={styles["contact-page"]}>
        <ContactHero hero={page.hero} contact={page.contact} />
        <ContactDetails contact={page.contact} />
        <ContactLocation location={page.location} />
      </main>

      <SiteFooter />
    </div>
  );
}
