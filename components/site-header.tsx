import { LogoLink } from "@/components/logo";
import { HeaderNav } from "@/components/header-nav";
import { Container } from "@/components/ui/container";

/** Sticky hairline header. Only the nav itself is a Client Component. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <LogoLink />
          <HeaderNav />
        </div>
      </Container>
    </header>
  );
}
