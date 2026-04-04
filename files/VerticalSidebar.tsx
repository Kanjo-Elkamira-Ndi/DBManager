import { useState, type CSSProperties, type JSX } from "react";
import {
  type NavItem,
  type SidebarProps,
  TOKEN,
  NAV_ITEMS,
  BOTTOM_ITEMS,
  BRAND_ICON,
} from "./sidebar.types";

// ─── NavButton ────────────────────────────────────────────────────────────────

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: (id: string) => void;
}

function NavButton({ item, isActive, onClick }: NavButtonProps): JSX.Element {
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
        ...s.navBtn,
        background: bg,
        color,
      }}
    >
      <span style={{ ...s.navIcon, opacity: iconOpacity }}>{item.icon}</span>
      <span style={s.navLabel}>{item.label}</span>

      {/* Active indicator bar */}
      {isActive && <span style={s.activeBar} aria-hidden="true" />}
    </button>
  );
}

// ─── VerticalSidebar ──────────────────────────────────────────────────────────

/**
 * Vertical sidebar for The Archivist dashboard.
 *
 * Usage in App.tsx / DashboardLayout.tsx:
 * ```tsx
 * import VerticalSidebar from "./components/VerticalSidebar";
 *
 * <div style={{ display: "flex", height: "100vh" }}>
 *   <VerticalSidebar activeId={currentRoute} onNavigate={navigate} />
 *   <main style={{ flex: 1 }}><Outlet /></main>
 * </div>
 * ```
 */
export default function VerticalSidebar({
  activeId = "dashboard",
  onNavigate,
}: SidebarProps): JSX.Element {
  const [active, setActive] = useState<string>(activeId);

  const handleClick = (id: string): void => {
    setActive(id);
    onNavigate?.(id);
  };

  return (
    <>
      <style>{CSS}</style>
      <aside style={s.sidebar} role="navigation" aria-label="Main navigation">

        {/* ── Brand ── */}
        <div style={s.brand}>
          <div style={s.brandIcon} aria-hidden="true">{BRAND_ICON}</div>
          <div style={s.brandText}>
            <span style={s.brandName}>The Archivist</span>
            <span style={s.brandSub}>EDITORIAL ADMIN</span>
          </div>
        </div>

        {/* ── Primary nav ── */}
        <nav style={s.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={handleClick}
            />
          ))}
        </nav>

        {/* ── Spacer ── */}
        <div style={{ flex: 1 }} aria-hidden="true" />

        {/* ── Bottom section ── */}
        <div style={s.bottom}>
          <div style={s.divider} role="separator" />

          {/* CTA */}
          <button style={s.createBtn} className="archivist-create-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New Entry
          </button>

          {/* Secondary nav */}
          <nav style={{ ...s.nav, paddingTop: 4 }} aria-label="Secondary">
            {BOTTOM_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={active === item.id}
                onClick={handleClick}
              />
            ))}
          </nav>
        </div>

      </aside>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  sidebar: {
    width: 240,
    height: "100%",
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${TOKEN.sidebarTop} 0%, ${TOKEN.sidebarBottom} 100%)`,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    paddingBottom: 16,
    boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
  },

  // Brand
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "28px 20px 22px",
    flexShrink: 0,
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: TOKEN.accent,
    color: TOKEN.textPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  brandName: {
    color: TOKEN.textPrimary,
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: TOKEN.font,
    lineHeight: 1.2,
    letterSpacing: "0.01em",
  },
  brandSub: {
    color: TOKEN.textMuted,
    fontSize: 9,
    fontFamily: TOKEN.fontMono,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
  },

  // Nav
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    padding: "4px 10px",
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "9px 12px",
    borderRadius: 7,
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left" as const,
    position: "relative" as const,
    fontSize: 13.5,
    transition: "background 0.14s, color 0.14s",
    fontFamily: TOKEN.font,
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "opacity 0.14s",
  },
  navLabel: {
    flex: 1,
    fontFamily: TOKEN.font,
    fontSize: 13.5,
    lineHeight: 1.3,
  },
  activeBar: {
    position: "absolute" as const,
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 3,
    height: "55%",
    borderRadius: "3px 0 0 3px",
    background: TOKEN.accent,
  },

  // Bottom
  bottom: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  divider: {
    height: 1,
    background: TOKEN.divider,
    margin: "8px 16px 14px",
  },
  createBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    margin: "0 10px 6px",
    padding: "9px 16px",
    borderRadius: 7,
    border: "none",
    background: TOKEN.accent,
    color: TOKEN.textPrimary,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: TOKEN.font,
    letterSpacing: "0.01em",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    transition: "filter 0.14s",
  },
};

const CSS = `
  .archivist-create-btn:hover { filter: brightness(1.14); }
`;
