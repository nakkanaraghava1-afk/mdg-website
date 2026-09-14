import React, { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        w-full overflow-hidden
        border-t-[3px] border-orange-500
        bg-white
        transition-all duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isMounted
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
        ${
          isScrolled
            ? "h-[88px] shadow-[0_10px_35px_rgba(15,23,42,0.10)]"
            : "h-[140px] shadow-none"
        }
      `}
    >
      {/* =====================================================
          ARCHITECTURAL BACKGROUND
      ====================================================== */}
      <div
        className={`
          pointer-events-none absolute inset-0
          transition-opacity duration-700
          ${
            isScrolled
              ? "opacity-40"
              : "opacity-70"
          }
        `}
      >
        <picture>
          {/* Mobile background */}
          <source
            media="(max-width: 767px)"
            srcSet="/header-bg-mobile.png"
          />

          {/* Desktop background */}
          <img
            src="/header-bg-desktop.png"
            alt=""
            aria-hidden="true"
            className="
              h-full
              w-full
              object-cover
              object-center
            "
          />
        </picture>
      </div>

      {/* =====================================================
          WHITE READABILITY OVERLAY
      ====================================================== */}
      <div
        className={`
          pointer-events-none absolute inset-0
          transition-all duration-700
          ${
            isScrolled
              ? "bg-white/75"
              : "bg-white/55"
          }
        `}
      />

      {/* =====================================================
          SOFT CENTER FADE
          Keeps the logo area bright
      ====================================================== */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(
            circle_at_center,
            rgba(255,255,255,0.96)_0%,
            rgba(255,255,255,0.82)_26%,
            rgba(255,255,255,0.38)_58%,
            rgba(255,255,255,0.08)_100%
          )]
        "
      />

      {/* =====================================================
          MAIN LOGO CONTAINER
      ====================================================== */}
      <div
        className={`
          relative z-10
          flex h-full w-full
          items-center justify-center
          px-6
          transition-all duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isScrolled
              ? "-translate-y-[1px]"
              : "translate-y-0"
          }
        `}
      >
        <a
          href="/"
          aria-label="Mannan Design Group"
          className="
            group
            relative
            flex
            items-center
            justify-center
            outline-none
          "
        >
          {/* =================================================
              SUBTLE ORANGE ACCENT GLOW
          ================================================== */}
          <span
            className="
              pointer-events-none
              absolute
              inset-1/4
              rounded-full
              bg-orange-500/10
              blur-2xl
              opacity-0
              transition-opacity
              duration-700
              group-hover:opacity-100
            "
          />

          {/* =================================================
              LOGO
          ================================================== */}
          <img
            src="/logo.png"
            alt="Mannan Design Group - Structural Engineers"
            className={`
              relative z-10
              w-auto
              object-contain
              select-none
              drop-shadow-[0_3px_8px_rgba(0,0,0,0.06)]
              transition-all duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isScrolled
                  ? "h-[72px] scale-[0.94]"
                  : "h-[104px] scale-100"
              }
              max-md:${
                isScrolled
                  ? "h-[52px]"
                  : "h-[68px]"
              }
            `}
            draggable={false}
          />
        </a>
      </div>

      {/* =====================================================
          BOTTOM ORANGE ARCHITECTURAL ACCENT
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute bottom-0 left-1/2
          h-[2px]
          -translate-x-1/2
          bg-orange-500
          transition-all duration-700
          ease-out
          w-[110px]
          md:w-[150px]
        "
      />

      {/* =====================================================
          SUBTLE BOTTOM SHADOW LINE
      ====================================================== */}
      <div
        className={`
          pointer-events-none
          absolute bottom-0 left-0
          h-px w-full
          bg-slate-200
          transition-opacity duration-500
          ${
            isScrolled
              ? "opacity-100"
              : "opacity-50"
          }
        `}
      />
    </header>
  );
};

export default Header;