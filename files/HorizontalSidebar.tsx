import { useState, type CSSProperties, type JSX } from "react";
import {
  type NavItem,
  type SidebarProps,
  TOKEN,
  NAV_ITEMS,
  BOTTOM_ITEMS,
  BRAND_ICON,
} from "./sidebar.types";

// ─── NavTab ───────────────────────────────────────────────────────────────────

interface NavTabProps {
  item: NavItem;
  isActive: boolean;
  onClick: (id: string) => void;
}

function NavTab({ item, isActive, onClick }: NavTabProps): JSX.Element {
  const [hovered, setHovered] = useState<boolean>(false);

  const bg = isActive ? TOKEN.activeBg : hovered ? TOKEN.hoverBg : "transparent";
  const color = isActive || hovered ? TOKEN.textPrimary : TOKEN.textMuted;
  const iconOpacity = isActive || hovered ? 1 : 0.6;

  return (
    <button
      onClick={() => onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={isActive ? "page" : undefined}
      style={{
        ...s.tab,
        background: bg,
        color,
      }}
      title={item.label}
    >
      <span style={{ ...s.tabIcon, opacity: iconOpacity }}>{item.icon}</span>
      <span style={s.tabLabel}>{item.label}</span>

      {/* Active underline indicator */}
      {isActive && <span style={s.activeUnderline} aria-hidden="true" />}
    </button>
  );
}

// ─── HorizontalSidebar ────────────────────────────────────────────────────────

/**
 * Horizontal top navigation bar for The Archivist dashboard.
 * Renders brand on the left, nav tabs in the centre, and action items on the right.
 *
 * Usage in App.tsx / DashboardLayout.tsx:
 * ```tsx
 * import HorizontalSidebar from "./components/HorizontalSidebar";
 *
 * <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
 *   <HorizontalSidebar activeId={currentRoute} onNavigate={navigate} />
 *   <main style={{ flex: 1, overflowY: "auto" }}><Outlet /></main>
 * </div>
 * ```
 */
export default function HorizontalSidebar({
  activeId = "dashboard",
  onNavigate,
}: SidebarProps): JSX.Element {
  const [active, setActive] = useState<string>(activeId);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleClick = (id: string): void => {
    setActive(id);
    setMobileOpen(false);
    onNavigate?.(id);
  };

  return (
    <>
      <style>{CSS}</style>

      <header style={s.bar} role="banner">

        {/* ── Brand ── */}
        <div style={s.brand}>
          <div style={s.brandIcon} aria-hidden="true">{BRAND_ICON}</div>
          <div style={s.brandText}>
            <span style={s.brandName}>The Archivist</span>
            <span style={s.brandSub}>EDITORIAL ADMIN</span>
          </div>
        </div>

        {/* ── Primary nav (desktop) ── */}
        <nav style={s.navDesktop} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavTab
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={handleClick}
            />
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div style={s.actions}>
          {/* Create CTA */}
          <button style={s.createBtn} className="archivist-create-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Entry
          </button>

          {/* Secondary items */}
          {BOTTOM_ITEMS.map((item) => (
            <NavTab
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={handleClick}
            />
          ))}

          {/* Mobile hamburger */}
          <button
            style={s.hamburger}
            className="archivist-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </header>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <nav style={s.mobileDrawer} aria-label="Mobile navigation">
          {[...NAV_ITEMS, ...BOTTOM_ITEMS].map((item) => (
            <NavTab
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={handleClick}
            />
          ))}
        </nav>
      )}
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  bar: {
    width: "100%",
    height: 60,
    background: `linear-gradient(90deg, ${TOKEN.sidebarTop} 0%, ${TOKEN.sidebarBottom} 100%)`,
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingInline: 16,
    boxShadow: "0 2px 16px rgba(0,0,0,0.22)",
    flexShrink: 0,
    position: "relative" as const,
    zIndex: 100,
    boxSizing: "border-box" as const,
  },

  // Brand
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
    marginRight: 8,
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    background: TOKEN.accent,
    color: TOKEN.textPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  brandName: {
    color: TOKEN.textPrimary,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: TOKEN.font,
    lineHeight: 1.2,
    letterSpacing: "0.01em",
    whiteSpace: "nowrap" as const,
  },
  brandSub: {
    color: TOKEN.textMuted,
    fontSize: 8,
    fontFamily: TOKEN.fontMono,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    whiteSpace: "nowrap" as const,
  },

  // Desktop nav
  navDesktop: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flex: 1,
    overflowX: "auto" as const,
    // Hide scrollbar across browsers via CSS class below
  },

  // Tab button
  tab: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "6px 11px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontFamily: TOKEN.font,
    whiteSpace: "nowrap" as const,
    position: "relative" as const,
    flexShrink: 0,
    transition: "background 0.14s, color 0.14s",
  },
  tabIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "opacity 0.14s",
  },
  tabLabel: {
    fontFamily: TOKEN.font,
    fontSize: 13,
    lineHeight: 1,
  },
  activeUnderline: {
    position: "absolute" as const,
    bottom: 0,
    left: "15%",
    right: "15%",
    height: 2,
    borderRadius: "2px 2px 0 0",
    background: TOKEN.accent,
  },

  // Right actions
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
    marginLeft: "auto",
  },
  createBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 13px",
    borderRadius: 6,
    border: "none",
    background: TOKEN.accent,
    color: TOKEN.textPrimary,
    cursor: "pointer",
    fontSize: 12.5,
    fontWeight: "bold",
    fontFamily: TOKEN.font,
    letterSpacing: "0.01em",
    whiteSpace: "nowrap" as const,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    transition: "filter 0.14s",
    flexShrink: 0,
  },
  hamburger: {
    display: "none",   // shown via CSS media query below
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: TOKEN.textMuted,
    cursor: "pointer",
  },

  // Mobile drawer
  mobileDrawer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: "8px 10px",
    background: TOKEN.sidebarBottom,
    borderBottom: `1px solid ${TOKEN.divider}`,
    zIndex: 99,
  },
};

const CSS = `
  .archivist-create-btn:hover { filter: brightness(1.14); }

  /* Hide scrollbar on nav */
  nav[aria-label="Primary"] { scrollbar-width: none; }
  nav[aria-label="Primary"]::-webkit-scrollbar { display: none; }

  /* Responsive: hide desktop nav, show hamburger below 768px */
  @media (max-width: 768px) {
    nav[aria-label="Primary"] { display: none !important; }
    .archivist-hamburger { display: flex !important; }
  }
`;
