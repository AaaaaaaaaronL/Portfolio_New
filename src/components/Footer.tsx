import { site } from "@content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>{site.footer.text.replace("{year}", String(year))}</p>
      <p className="footer__legal">{site.legalName}</p>
    </footer>
  );
}
