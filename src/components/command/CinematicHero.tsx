import React, { useEffect, useRef, useState } from 'react';
import { useIntelligence } from '../../context/IntelligenceContext';
import {
  ArrowUpRight,
  Play,
  Zap,
  ChevronDown,
  ArrowUp,
  Shield,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { ScenarioId } from '../../types';

interface CardTilt {
  x: number;
  y: number;
  px: number;
  py: number;
  hovered: boolean;
}

export const CinematicHero: React.FC = () => {
  const { currentScenarioId, switchScenario, setActiveTab } = useIntelligence();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse & Scroll State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousePixel, setMousePixel] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Individual Card Tilt for Platform Capabilities
  const [cardTilts, setCardTilts] = useState<CardTilt[]>([
    { x: 0, y: 0, px: 0, py: 0, hovered: false },
    { x: 0, y: 0, px: 0, py: 0, hovered: false },
    { x: 0, y: 0, px: 0, py: 0, hovered: false },
  ]);

  // Clean, sophisticated scenario descriptors (No red in the star/middle)
  const getScenarioData = () => {
    switch (currentScenarioId) {
      case 'digital_arrest':
        return {
          badge: 'THREAT INTERCEPTED',
          badgeTone: 'rose',
          titleHighlight: 'shields',
          amount: '₹2,40,000',
          headline: 'Digital Arrest Scam Intercepted',
          subtext: 'Synthetic police impersonation and coercive escrow demands detected in real time.',
          targetTab: 'fraud' as const,
        };
      case 'fake_kyc':
        return {
          badge: 'PHISHING VECTOR BLOCKED',
          badgeTone: 'rose',
          titleHighlight: 'neutralizes',
          amount: '₹45,000',
          headline: 'Fake KYC Phishing Quarantined',
          subtext: 'Malicious PAN-linking gateway impersonating NPCI isolated before credentials leaked.',
          targetTab: 'fraud' as const,
        };
      case 'financial_distress':
        return {
          badge: 'BUFFER CONTRACTION',
          badgeTone: 'amber',
          titleHighlight: 'balances',
          amount: '1.56 Mo Runway',
          headline: 'Predictive Runway Advisory Active',
          subtext: 'Discretionary outflows expanded by 28%. Dynamic cashflow stabilization initiated.',
          targetTab: 'health' as const,
        };
      case 'legitimate_vendor':
      default:
        return {
          badge: 'PERIMETER SECURE',
          badgeTone: 'emerald',
          titleHighlight: 'protects',
          amount: '₹18,500 Disbursed',
          headline: 'All Perimeters Clear',
          subtext: 'Autonomous behavioral telemetry confirms zero coercive friction across active channels.',
          targetTab: 'fraud' as const,
        };
    }
  };

  const scenario = getScenarioData();

  // Native Scroll-Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackTop = rect.top;
      const trackHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollableDist = trackHeight - windowHeight;
      if (scrollableDist <= 0) return;

      const progress = Math.min(1, Math.max(0, -trackTop / scrollableDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active scenario for canvas dynamic color lerping without re-triggering
  const scenarioRef = useRef(scenario);
  useEffect(() => {
    scenarioRef.current = scenario;
  }, [scenario]);

  // 3D Canvas Star & Warp Camera Journey
  // Smoothly interpolates to the active scenario's tone color
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // ── 1. Warp Field Ambient Space Stars ──
    const NUM_WARP_STARS = 160;
    const warpStars: { x: number; y: number; z: number; size: number }[] = [];
    for (let i = 0; i < NUM_WARP_STARS; i++) {
      warpStars.push({
        x: (Math.random() - 0.5) * width * 2.2,
        y: (Math.random() - 0.5) * height * 2.2,
        z: Math.random() * 1200 - 200,
        size: Math.random() * 1.1 + 0.4,
      });
    }

    // ── 2. The 3D Neural Star Sphere Particles ──
    const NUM_STAR_NODES = 320;
    const STAR_RADIUS = 145;
    const starNodes: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

    for (let i = 0; i < NUM_STAR_NODES; i++) {
      const phi = Math.acos(-1 + (2 * i) / NUM_STAR_NODES);
      const theta = Math.sqrt(NUM_STAR_NODES * Math.PI) * phi;
      starNodes.push({
        x: STAR_RADIUS * Math.cos(theta) * Math.sin(phi),
        y: STAR_RADIUS * Math.sin(theta) * Math.sin(phi),
        z: STAR_RADIUS * Math.cos(phi),
        size: Math.random() * 1.3 + 0.6,
        alpha: Math.random() * 0.4 + 0.25,
      });
    }

    // ── 3. 3D Planetary Celestial Rings ──
    const RINGS = [
      { radius: STAR_RADIUS * 1.35, tilt: 0.92, speed: 0.007, count: 60, color: 'rgba(56, 189, 248, 0.35)' },
      { radius: STAR_RADIUS * 1.68, tilt: -0.65, speed: -0.005, count: 70, color: 'rgba(45, 212, 191, 0.25)' },
      { radius: STAR_RADIUS * 2.00, tilt: 0.35, speed: 0.003, count: 45, color: 'rgba(148, 163, 184, 0.2)' },
    ];

    let smoothProgress = 0;
    let angleY = 0;
    let angleX = 0;
    const FOCAL_LENGTH = 440;

    // Active color for smooth interpolation
    let activeColor = [56, 189, 248]; // Default Sky Blue

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // Determine target color based on active scenario badgeTone
      let targetColor = [56, 189, 248]; // sky-400
      const tone = scenarioRef.current.badgeTone;
      if (tone === 'rose') targetColor = [225, 29, 72]; // rose-600
      else if (tone === 'amber') targetColor = [245, 158, 11]; // amber-500
      else if (tone === 'emerald') targetColor = [16, 185, 129]; // emerald-500

      // Smooth color lerp
      activeColor[0] += (targetColor[0] - activeColor[0]) * 0.05;
      activeColor[1] += (targetColor[1] - activeColor[1]) * 0.05;
      activeColor[2] += (targetColor[2] - activeColor[2]) * 0.05;
      const [cr, cg, cb] = activeColor.map(Math.round);

      // Ultra-smooth scroll lerp for buttery transitions
      smoothProgress += (scrollProgress - smoothProgress) * 0.07;

      // ── Continuous Camera Zoom Math ──
      const diveProgress = Math.min(1, Math.max(0, (smoothProgress - 0.12) / 0.68));
      // Smooth continuous S-curve (cosine ease)
      const easedDive = 0.5 - 0.5 * Math.cos(diveProgress * Math.PI);

      // Camera travels smoothly through the center of the star
      const cameraZ = easedDive * (STAR_RADIUS * 2.4);

      // Smooth mouse tilt with soft inertial damping
      const targetAngleY = mousePos.x * 0.4 + smoothProgress * 0.7;
      const targetAngleX = -mousePos.y * 0.4 - easedDive * 0.2;
      angleY += (targetAngleY - angleY) * 0.045 + 0.002;
      angleX += (targetAngleX - angleX) * 0.045;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // ── Render Warp Field Ambient Space Stars ──
      const warpSpeed = easedDive * 22 + 0.7;
      ctx.fillStyle = '#cbd5e1';
      for (let i = 0; i < warpStars.length; i++) {
        const ws = warpStars[i];
        ws.z -= warpSpeed;
        if (ws.z < -200) ws.z += 1400;

        const pzRel = ws.z - cameraZ * 0.3 + 400;
        if (pzRel > 10) {
          const scale = FOCAL_LENGTH / pzRel;
          const sx = cx + ws.x * scale;
          const sy = cy + ws.y * scale;

          if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
            const alpha = Math.min(0.45, Math.max(0.05, (1200 - pzRel) / 1400));
            ctx.globalAlpha = alpha;

            if (easedDive > 0.1) {
              const streakLen = easedDive * 8 * scale;
              const angle = Math.atan2(sy - cy, sx - cx);
              ctx.strokeStyle = `rgba(203, 213, 225, ${alpha * 0.4})`;
              ctx.lineWidth = ws.size * scale * 0.5;
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              ctx.lineTo(sx - Math.cos(angle) * streakLen, sy - Math.sin(angle) * streakLen);
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.arc(sx, sy, ws.size * scale * 0.7, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // ── Render 3D Star Soft Core Glow (Pure Starlight - Zero Red) ──
      const starFade = Math.max(0, 1 - Math.max(0, (smoothProgress - 0.52) / 0.35));
      const coreExpansion = 1 + Math.pow(easedDive, 2.2) * 10;
      const coreRadius = (STAR_RADIUS * 0.5) * coreExpansion;

      if (starFade > 0.01) {
        // Soft celestial dynamic halo
        const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 2.0);
        haloGrad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.12)`);
        haloGrad.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, 0.05)`);
        haloGrad.addColorStop(0.8, 'rgba(7, 9, 14, 0.01)');
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.globalAlpha = starFade;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius * 2.0, 0, Math.PI * 2);
        ctx.fill();

        // Deep serene dynamic starlight core
        const coreGrad = ctx.createRadialGradient(cx, cy, 1, cx, cy, coreRadius);
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
        coreGrad.addColorStop(0.25, `rgba(${cr}, ${cg}, ${cb}, 0.35)`);
        coreGrad.addColorStop(0.65, 'rgba(7, 9, 14, 0.85)');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.globalAlpha = starFade;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        // ── Render 3D Planetary Orbital Rings ──
        RINGS.forEach(ring => {
          ctx.save();
          ctx.translate(cx, cy);
          const ringRadius = ring.radius * (1 + easedDive * 3.2);
          const ringSin = Math.sin(ring.tilt);

          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.14) {
            const rx = ringRadius * Math.cos(a);
            const rz = ringRadius * Math.sin(a);
            const px = rx * cosY - rz * sinY;
            const pz = rx * sinY + rz * cosY;
            const py = rz * ringSin;

            const pzRel = pz - cameraZ + FOCAL_LENGTH;
            if (pzRel > 15) {
              const scale = FOCAL_LENGTH / pzRel;
              const screenX = px * scale;
              const screenY = py * scale;
              if (a === 0) ctx.moveTo(screenX, screenY);
              else ctx.lineTo(screenX, screenY);
            }
          }
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = 0.75;
          ctx.globalAlpha = starFade * 0.7;
          ctx.stroke();

          // Ring Node Particles
          const ringOffset = Date.now() * ring.speed * 0.04 + smoothProgress * 1.2;
          for (let i = 0; i < ring.count; i++) {
            const a = (i / ring.count) * Math.PI * 2 + ringOffset;
            const rx = ringRadius * Math.cos(a);
            const rz = ringRadius * Math.sin(a);
            const px = rx * cosY - rz * sinY;
            const pz = rx * sinY + rz * cosY;
            const py = rz * ringSin;

            const pzRel = pz - cameraZ + FOCAL_LENGTH;
            if (pzRel > 15) {
              const scale = FOCAL_LENGTH / pzRel;
              const screenX = px * scale;
              const screenY = py * scale;
              const alpha = Math.max(0.06, Math.min(0.5, (pzRel) / (FOCAL_LENGTH * 2)));

              ctx.fillStyle = ring.color;
              ctx.globalAlpha = alpha * starFade;
              ctx.beginPath();
              ctx.arc(screenX, screenY, (i % 6 === 0 ? 1.6 : 0.9) * scale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
        });

        // ── Project and Render 3D Neural Star Nodes ──
        const projected = starNodes
          .map(p => {
            let x1 = p.x * cosY - p.z * sinY;
            let z1 = p.x * sinY + p.z * cosY;
            let y2 = p.y * cosX - z1 * sinX;
            let z2 = p.y * sinX + z1 * cosX;

            const pzRel = z2 - cameraZ + FOCAL_LENGTH;
            const scale = FOCAL_LENGTH / Math.max(12, pzRel);

            return {
              screenX: cx + x1 * scale,
              screenY: cy + y2 * scale,
              scale,
              z: z2,
              pzRel,
              size: p.size * scale,
              alpha: pzRel <= 25 ? 0 : p.alpha * Math.min(1, (pzRel - 25) / 100),
            };
          })
          .filter(p => p.pzRel > 20);

        projected.sort((a, b) => a.z - b.z);

        ctx.lineWidth = 0.5;
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          if (p.alpha <= 0.02) continue;

          ctx.globalAlpha = p.alpha * starFade * 0.65;
          ctx.fillStyle = p.z > 0 ? '#38bdf8' : '#cbd5e1';

          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();

          // Delicate connecting lines
          if (i % 4 === 0 && easedDive < 0.55) {
            for (let j = i + 1; j < Math.min(i + 3, projected.length); j++) {
              const p2 = projected[j];
              const dist = Math.hypot(p.screenX - p2.screenX, p.screenY - p2.screenY);
              if (dist < 38 * (1 + easedDive * 1.1)) {
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
                ctx.beginPath();
                ctx.moveTo(p.screenX, p.screenY);
                ctx.lineTo(p2.screenX, p2.screenY);
                ctx.stroke();
              }
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos, scrollProgress]);

  // Handle Mouse Coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
    setMousePixel({ x: e.clientX, y: e.clientY });
  };

  // Card Mouse Tilt handlers for Platform Capabilities
  const handleCardMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    setCardTilts(prev => {
      const next = [...prev];
      next[index] = { x, y, px, py, hovered: true };
      return next;
    });
  };

  const handleCardMouseLeave = (index: number) => {
    setCardTilts(prev => {
      const next = [...prev];
      next[index] = { x: 0, y: 0, px: 0, py: 0, hovered: false };
      return next;
    });
  };

  // ── Silky Smooth Continuous Transition Math ──
  // Phase 1: Hero text gracefully fades out (0.00 -> 0.22)
  const heroFadeRaw = Math.min(1, Math.max(0, scrollProgress / 0.20));
  const heroFadeOut = 1 - (0.5 - 0.5 * Math.cos(heroFadeRaw * Math.PI));
  const heroTranslateY = -scrollProgress * 200;

  // Phase 3: Platform Capabilities smoothly emerges with a long cosine S-curve (0.48 -> 0.88)
  const emergeRaw = Math.min(1, Math.max(0, (scrollProgress - 0.46) / 0.38));
  const emergeProgress = 0.5 - 0.5 * Math.cos(emergeRaw * Math.PI);
  const emergeScale = 0.92 + emergeProgress * 0.08;
  const emergeTranslateY = (1 - emergeProgress) * 25;
  const isCapabilitiesInteractive = emergeProgress > 0.6;

  const scrollToCapabilities = () => {
    if (!trackRef.current) return;
    const scrollableDist = trackRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: trackRef.current.offsetTop + scrollableDist,
      behavior: 'smooth'
    });
  };

  const scrollToHero = () => {
    if (!trackRef.current) return;
    window.scrollTo({
      top: trackRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const pillars = [
    {
      icon: Shield,
      title: 'Fraud Intelligence',
      tag: 'REAL-TIME CHECK',
      description: 'Test live transfers against our Core Banking Registry. Spots name mismatches, mule accounts, and coercive scam patterns before money moves.',
      actionLabel: 'Launch Simulator',
      tab: 'fraud' as const,
      color: 'text-rose-400',
      borderHover: 'hover:border-rose-500/30',
      glowColor: 'rgba(225, 29, 72, 0.08)',
    },
    {
      icon: TrendingUp,
      title: 'Financial Health',
      tag: 'RESILIENCE MATRIX',
      description: 'Track runway velocity, liquid buffers, and shock absorption. Balances essential vs discretionary burn with predictive stress testing.',
      actionLabel: 'Explore Health Matrix',
      tab: 'health' as const,
      color: 'text-emerald-400',
      borderHover: 'hover:border-emerald-500/30',
      glowColor: 'rgba(5, 150, 105, 0.08)',
    },
    {
      icon: Cpu,
      title: 'AI Governance & Audit',
      tag: 'ZERO-KNOWLEDGE',
      description: 'Audit explainable neural reasoning, bias safeguards, and cryptographic verification ledger. Zero private banking data leaves your device.',
      actionLabel: 'Inspect Pipeline',
      tab: 'ai-center' as const,
      color: 'text-sky-400',
      borderHover: 'hover:border-sky-500/30',
      glowColor: 'rgba(2, 132, 199, 0.08)',
    },
  ];

  return (
    <div
      ref={trackRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="relative w-full h-[260vh] select-none"
    >
      {/* ── STICKY VIEWPORT STAGE ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07090e] text-white shadow-2xl flex flex-col items-center justify-center">

        {/* Soft, Subtle Cursor Glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            background: isHovered
              ? `radial-gradient(700px circle at ${mousePixel.x}px ${mousePixel.y}px, rgba(56, 189, 248, 0.04), transparent 70%)`
              : 'transparent',
          }}
        />

        {/* Background Star Dust Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* ── 3D CANVAS STAGE (Full-bleed background) ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* ── LAYER 1: HERO SCENE (Space Scene & Headline) ── */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-between px-6 pt-12 pb-6 max-w-5xl mx-auto w-full text-center transition-all duration-150"
          style={{
            opacity: heroFadeOut,
            transform: `translateY(${heroTranslateY}px) scale(${1 + (1 - heroFadeOut) * 0.08})`,
            pointerEvents: heroFadeOut > 0.15 ? 'auto' : 'none',
          }}
        >
          {/* Top Headline & Pill Group */}
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 max-w-3xl">
            {/* Minimal Glass Pill Tag */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl shadow-inner">
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
              <span className="font-mono text-[11px] font-semibold tracking-widest text-white/90 uppercase">
                {scenario.badge}
              </span>
              <span className="text-white/30">|</span>
              <span className="font-mono text-[11px] tracking-wider text-white/60 uppercase">
                AUTONOMOUS COGNITIVE DEFENSE
              </span>
            </div>

            {/* Grand Centered Editorial Headline with Luxury Serif */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.01em] text-white leading-[1.08] text-balance">
              Intelligence that{' '}
              <span className="italic text-[1.05em] tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-teal-200 to-white pr-1">
                {scenario.titleHighlight}
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="font-medium tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300">
                your capital.
              </span>
            </h1>

            <p className="font-sans text-xs sm:text-sm md:text-base text-white/70 font-light leading-relaxed max-w-xl mx-auto text-balance tracking-[-0.01em]">
              Next-generation scam interception and autonomous financial defense. Sentinel safeguards your transactions before money moves—transparently, explainably, and without friction.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
              <button
                onClick={() => setActiveTab(scenario.targetTab)}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold tracking-wide text-black transition-all duration-300 bg-white hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] active:scale-95"
              >
                <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
                <span>Test Live Safety Simulator</span>
                <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={scrollToCapabilities}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-5 py-3 text-sm font-medium tracking-wide text-white/90 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 active:scale-95"
              >
                <span>Travel to Capabilities</span>
                <ChevronDown className="h-4 w-4 opacity-60" />
              </button>
            </div>
          </div>

          {/* Clean Center: Pure Star Object, Zero Red Blink */}
          <div className="relative my-auto flex flex-col items-center justify-center pointer-events-none">
            {/* Clean, subtle scroll indicator */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white/35 uppercase">
              <span>Scroll down to enter the star</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>

          {/* Bottom Scenario Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-white/50 pt-2 pb-2">
            <span className="text-[11px] uppercase tracking-wider font-medium text-white/40">Switch Scenarios:</span>
            <button
              onClick={() => switchScenario('digital_arrest')}
              className={`rounded-full px-3.5 py-1.5 transition-all border ${
                currentScenarioId === 'digital_arrest'
                  ? 'bg-rose-600 text-white border-rose-500 font-bold shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              🚨 Digital Arrest
            </button>
            <button
              onClick={() => switchScenario('fake_kyc')}
              className={`rounded-full px-3.5 py-1.5 transition-all border ${
                currentScenarioId === 'fake_kyc'
                  ? 'bg-rose-600 text-white border-rose-500 font-bold shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              ⚠️ Fake KYC Phishing
            </button>
            <button
              onClick={() => switchScenario('financial_distress')}
              className={`rounded-full px-3.5 py-1.5 transition-all border ${
                currentScenarioId === 'financial_distress'
                  ? 'bg-amber-600 text-white border-amber-500 font-bold shadow-[0_0_10px_rgba(217,119,6,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              📉 Distress Warning
            </button>
            <button
              onClick={() => switchScenario('legitimate_vendor')}
              className={`rounded-full px-3.5 py-1.5 transition-all border ${
                currentScenarioId === 'legitimate_vendor'
                  ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-[0_0_10px_rgba(5,150,105,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              ✓ Verified Vendor
            </button>
          </div>
        </div>

        {/* ── LAYER 2: PLATFORM CAPABILITIES (High-tech interactive command deck) ── */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 py-6 max-w-7xl mx-auto w-full transition-all duration-200 ease-out"
          style={{
            opacity: emergeProgress,
            transform: `scale(${emergeScale}) translateY(${emergeTranslateY}px)`,
            pointerEvents: isCapabilitiesInteractive ? 'auto' : 'none',
          }}
        >
          {/* Header Bar & Orbit Return */}
          <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/15 pb-3.5 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-sky-400 font-bold">
                  // SOVEREIGN DEFENSE CAPABILITIES · LIVE RADAR ACTIVE
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-white mt-1">
                Engineered for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">Total Capital Sovereignty.</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                AUTONOMOUS ENGINE ONLINE
              </span>
              <button
                onClick={scrollToHero}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-white/60 hover:text-white transition-colors self-start sm:self-auto bg-white/[0.05] border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Orbit View</span>
              </button>
            </div>
          </div>

          {/* 3 Rich Interactive Capability Cards with Live Interactive Previews */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            
            {/* ── CARD 1: FRAUD INTELLIGENCE ── */}
            <div
              onMouseMove={(e) => handleCardMouseMove(0, e)}
              onMouseLeave={() => handleCardMouseLeave(0)}
              onClick={() => setActiveTab('fraud')}
              style={{
                transform: cardTilts[0].hovered
                  ? `perspective(800px) rotateX(${-cardTilts[0].y * 6}deg) rotateY(${cardTilts[0].x * 6}deg) translateY(-4px) scale(1.01)`
                  : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
                transition: cardTilts[0].hovered
                  ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
                  : 'transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.5s ease-out',
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-500/20 bg-black/70 p-5 sm:p-6 backdrop-blur-2xl shadow-xl hover:border-rose-500/50 cursor-pointer transition-all"
            >
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-wider text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full uppercase">
                    REAL-TIME INTERCEPT
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    Fraud Intelligence
                  </h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed mt-1 font-light">
                    Intercepts coercive Digital Arrest syndicates, mule networks, and fake KYC phishing gateways in real time.
                  </p>
                </div>

                {/* Embedded Mini Interactive Telemetry Widget */}
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-3 space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-rose-300 font-bold">
                    <span>LIVE RISK ENGINE</span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 text-[10px]">96 / 100 CRITICAL</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full w-[96%] animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/60 pt-0.5">
                    <span>Mule Account Flag</span>
                    <span className="text-rose-400">12 min old</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs font-semibold text-white group-hover:text-rose-400 transition-colors">
                <span>Launch Fraud Simulator</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* ── CARD 2: FINANCIAL HEALTH & RESILIENCE ── */}
            <div
              onMouseMove={(e) => handleCardMouseMove(1, e)}
              onMouseLeave={() => handleCardMouseLeave(1)}
              onClick={() => setActiveTab('health')}
              style={{
                transform: cardTilts[1].hovered
                  ? `perspective(800px) rotateX(${-cardTilts[1].y * 6}deg) rotateY(${cardTilts[1].x * 6}deg) translateY(-4px) scale(1.01)`
                  : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
                transition: cardTilts[1].hovered
                  ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
                  : 'transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.5s ease-out',
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-500/20 bg-black/70 p-5 sm:p-6 backdrop-blur-2xl shadow-xl hover:border-emerald-500/50 cursor-pointer transition-all"
            >
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">
                    RESILIENCE MATRIX
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Financial Health
                  </h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed mt-1 font-light">
                    Predictive cashflow stress testing, emergency runway velocity, and dynamic discretionary buffer insulation.
                  </p>
                </div>

                {/* Embedded Mini Interactive Runway Chart Widget */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-emerald-300 font-bold">
                    <span>RUNWAY TRAJECTORY</span>
                    <span className="text-emerald-400 text-[10px]">81/100 RESILIENT</span>
                  </div>
                  {/* Mini SVG Sparkline */}
                  <div className="h-7 w-full flex items-end">
                    <svg viewBox="0 0 100 25" className="w-full h-full overflow-visible" fill="none">
                      <path
                        d="M0 20 Q 25 15, 50 18 T 75 8 T 100 5"
                        stroke="#34d399"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="5" r="3" fill="#34d399" className="animate-ping opacity-75" />
                      <circle cx="100" cy="5" r="2.5" fill="#34d399" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/60 pt-0.5">
                    <span>Safe Runway</span>
                    <span className="text-emerald-400 font-bold">3.4 Months</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                <span>Explore Health Matrix</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* ── CARD 3: AI GOVERNANCE & ZERO-KNOWLEDGE ── */}
            <div
              onMouseMove={(e) => handleCardMouseMove(2, e)}
              onMouseLeave={() => handleCardMouseLeave(2)}
              onClick={() => setActiveTab('ai-center')}
              style={{
                transform: cardTilts[2].hovered
                  ? `perspective(800px) rotateX(${-cardTilts[2].y * 6}deg) rotateY(${cardTilts[2].x * 6}deg) translateY(-4px) scale(1.01)`
                  : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
                transition: cardTilts[2].hovered
                  ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
                  : 'transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.5s ease-out',
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sky-500/20 bg-black/70 p-5 sm:p-6 backdrop-blur-2xl shadow-xl hover:border-sky-500/50 cursor-pointer transition-all"
            >
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-wider text-sky-400 bg-sky-500/15 border border-sky-500/30 px-2 py-0.5 rounded-full uppercase">
                    ZERO-KNOWLEDGE
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    AI Governance & Audit
                  </h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed mt-1 font-light">
                    Explainable neural decisioning with immutable cryptographic tamper-proof ledger. Zero PII leaves device.
                  </p>
                </div>

                {/* Embedded Mini Cryptographic Verification Hash Widget */}
                <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-3 space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-sky-300 font-bold">
                    <span>ZK-PROOF LEDGER</span>
                    <span className="text-sky-400 text-[10px]">VERIFIED ✓</span>
                  </div>
                  <div className="p-1.5 rounded bg-black/50 border border-sky-500/20 text-[10px] text-sky-200 truncate font-mono">
                    SHA-256: 0x9f4e28...b71c0a
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/60 pt-0.5">
                    <span>Inference Location</span>
                    <span className="text-sky-400">On-Device Edge</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs font-semibold text-white group-hover:text-sky-400 transition-colors">
                <span>Inspect Neural Pipeline</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

          </div>

          {/* Minimalist HUD Telemetry Bar embedded in Platform Capabilities */}
          <div className="w-full mt-5 border-t border-white/10 pt-3.5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5">
                <div className="font-display text-lg sm:text-xl font-light text-white tracking-tight">14<span className="text-xs font-mono text-white/40 ml-0.5">ms</span></div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/50">Neural Intercept Latency</div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5">
                <div className="font-display text-lg sm:text-xl font-light text-emerald-400 tracking-tight">₹4.8<span className="text-xs font-mono text-emerald-400/60 ml-0.5">Cr+</span></div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/50">Simulated Fraud Deflected</div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5">
                <div className="font-display text-lg sm:text-xl font-light text-sky-400 tracking-tight">0<span className="text-xs font-mono text-sky-400/60 ml-0.5">% PII</span></div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/50">Zero-Knowledge On-Device</div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5">
                <div className="font-display text-lg sm:text-xl font-light text-white tracking-tight">100<span className="text-xs font-mono text-white/40 ml-0.5">%</span></div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/50">Sovereign Human Control</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
