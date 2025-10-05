"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function TractorGame() {
  const canvasRef = useRef(null)
  const [state, setState] = useState("idle") // "idle" | "running" | "gameover" | "final"
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  // Tractor physics/state
  const tractorYRef = useRef(0)
  const tractorVYRef = useRef(0)
  const obstaclesRef = useRef([]) // array of { x, gapY, width, gapHeight, passed }
  const distanceSinceSpawnRef = useRef(0)
  const lastTimeRef = useRef(null)

  const [lossCount, setLossCount] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [warningFact, setWarningFact] = useState(null)
  const warningTimeoutRef = useRef(null)
  const warningStartRef = useRef(null)

  const [lastRunTime, setLastRunTime] = useState(0) // seconds
  const [lastRunScore, setLastRunScore] = useState(0)
  const runStartRef = useRef(null)

  // Store gap to safely resume after the 5s warning
  const resumeTargetRef = useRef(null) // { gapY, gapHeight }

  // Config (Flappy-like; speeds are in px/sec)
  const cfg = {
    gravity: 1400, // px/s^2
    flap: -420, // px/s impulse
    speed: 200, // px/s world speed
    spacing: 340, // px between obstacle pairs
    gapHeight: 210, // fixed gap
    obstacleWidth: 90,
    tractor: {
      x: 120,
      w: 66,
      h: 42,
    },
  }

  const MAX_LIVES = 5
  const WARNING_DURATION = 5000

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  // Responsive canvas sizing with DPR
  const resizeCanvas = useCallback((c) => {
    const parent = c.parentElement
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const cssWidth = Math.min(parent ? parent.clientWidth : 720, 720)
    const cssHeight = Math.round(cssWidth * (9 / 16)) // 16:9 canvas
    c.style.width = `${cssWidth}px`
    c.style.height = `${cssHeight}px`
    c.width = Math.floor(cssWidth * dpr)
    c.height = Math.floor(cssHeight * dpr)
    const ctx = c.getContext("2d")
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // scale drawing to CSS pixels
  }, [])

  // Init high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tractor-best")
      if (saved) setBest(Number.parseInt(saved, 10) || 0)
    } catch {
      // ignore
    }
  }, [])

  const funFacts = [
    "Geomagnetic storms can disrupt GPS used in precision agriculture, reducing guidance accuracy for tractors.",
    "Solar flares can interfere with radio and satellite communications that farms rely on for coordination.",
    "Geomagnetically induced currents during strong solar storms can stress regional power grids that run irrigation and storage.",
    "Auroras signal increased space weather activity that can degrade GNSS signals, impacting field mapping and auto-steer.",
    "Space weather forecasts help schedule GPS‑dependent tasks when signal reliability might be reduced.",
  ]

  // Input: flap handler
  const flap = useCallback(() => {
    if (state === "final") return // game fully ended after 5 losses

    if (state === "idle") {
      resetGame()
      setState("running")
      runStartRef.current = performance.now()
    } else if (state === "running") {
      tractorVYRef.current = cfg.flap
    } else if (state === "gameover") {
      if (showWarning) return // block restart until warning disappears
      resetGame()
      setState("running")
      runStartRef.current = performance.now()
    }
  }, [state, showWarning])

  // Keyboard and pointer controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault()
        flap()
      }
    }
    const onPointer = (e) => {
      e.preventDefault()
      flap()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("mousedown", onPointer)
    window.addEventListener("touchstart", onPointer, { passive: false })
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("mousedown", onPointer)
      window.removeEventListener("touchstart", onPointer)
    }
  }, [flap])

  // Reset game state
  const resetGame = useCallback(() => {
    setScore(0)
    obstaclesRef.current = []
    tractorYRef.current = 200
    tractorVYRef.current = 0
    distanceSinceSpawnRef.current = 0
    lastTimeRef.current = null
    if (warningTimeoutRef.current) {
      window.clearTimeout(warningTimeoutRef.current)
      warningTimeoutRef.current = null
    }
    setShowWarning(false)
    setWarningFact(null)
    warningStartRef.current = null
  }, [])

  // Spawn obstacles (corn rows)
  const spawnObstacle = useCallback((canvasH, canvasW) => {
    const gapHeight = cfg.gapHeight
    const marginTop = 64
    const marginBottom = 64
    const minY = marginTop
    const maxY = canvasH - marginBottom - gapHeight
    const gapY = Math.round(minY + Math.random() * Math.max(1, maxY - minY))
    obstaclesRef.current.push({
      x: canvasW + cfg.obstacleWidth,
      gapY,
      width: cfg.obstacleWidth,
      gapHeight,
      passed: false,
    })
  }, [])

  // Collision detection
  const rectsOverlap = (a, b) => {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  }

  // Draw helpers
  const drawBackground = (ctx, w, h, t) => {
    // Sky
    ctx.fillStyle = "#CFE9FF" // light blue
    ctx.fillRect(0, 0, w, h)

    // Far field stripes
    ctx.fillStyle = "#7FC37A" // green
    const groundTop = Math.floor(h * 0.82)
    ctx.fillRect(0, groundTop, w, h - groundTop)
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, groundTop, w, h - groundTop)
    ctx.clip()
    ctx.strokeStyle = "#6AB468"
    ctx.lineWidth = 8
    const stripeGap = 26
    const offset = (t / 120) % stripeGap
    for (let x = -50 + offset; x < w + 50; x += stripeGap) {
      ctx.beginPath()
      ctx.moveTo(x, groundTop)
      ctx.lineTo(x - 40, h)
      ctx.stroke()
    }
    ctx.restore()

    // Distant corn silhouettes
    ctx.fillStyle = "#E0E27A" // pale corn
    for (let i = 0; i < 14; i++) {
      const cx = i * (w / 14) + ((t / 20) % (w / 14))
      const ch = 12 + (i % 3) * 8
      ctx.fillRect(cx % w, groundTop - ch, 6, ch)
    }
  }

  const drawCornObstacle = (ctx, o, canvasH) => {
    // columns
    ctx.fillStyle = "#EACF33" // corn yellow
    ctx.strokeStyle = "#B59A21"
    ctx.lineWidth = 2

    // Top column
    ctx.fillRect(o.x, 0, o.width, o.gapY)
    ctx.strokeRect(o.x + 0.5, 0.5, o.width - 1, o.gapY - 1)

    // Bottom column
    const bottomY = o.gapY + o.gapHeight
    ctx.fillRect(o.x, bottomY, o.width, canvasH - bottomY)
    ctx.strokeRect(o.x + 0.5, bottomY + 0.5, o.width - 1, canvasH - bottomY - 1)

    // Caps near the gap (visual clarity like pipe heads)
    const capH = 12
    ctx.fillStyle = "#D4B82C"
    ctx.fillRect(o.x - 1, o.gapY - capH, o.width + 2, capH) // bottom of top column
    ctx.fillRect(o.x - 1, bottomY, o.width + 2, capH) // top of bottom column
    ctx.strokeStyle = "#A98F22"
    ctx.strokeRect(o.x - 1 + 0.5, o.gapY - capH + 0.5, o.width + 2 - 1, capH - 1)
    ctx.strokeRect(o.x - 1 + 0.5, bottomY + 0.5, o.width + 2 - 1, capH - 1)

    // Subtle kernel pattern
    ctx.fillStyle = "rgba(255,255,255,0.2)"
    for (let y = 8; y < o.gapY - 6; y += 12) {
      for (let x = o.x + 6; x < o.x + o.width - 6; x += 10) {
        ctx.fillRect(x, y, 4, 6)
      }
    }
    for (let y = o.gapY + o.gapHeight + 8; y < canvasH - 6; y += 12) {
      for (let x = o.x + 6; x < o.x + o.width - 6; x += 10) {
        ctx.fillRect(x, y, 4, 6)
      }
    }
  }

  const drawTractor = (ctx, x, y, w, h, vy) => {
    ctx.save()
    // slight pitch based on vertical velocity
    const angle = clamp(vy / 900, -0.35, 0.45)
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(angle)
    ctx.translate(-w / 2, -h / 2)

    // body
    ctx.fillStyle = "#2E7D32" // tractor green
    ctx.strokeStyle = "#1B5E20"
    ctx.lineWidth = 2
    ctx.fillRect(0, 8, w, h - 8)
    ctx.strokeRect(0.5, 8.5, w - 1, h - 9)

    // cabin
    ctx.fillStyle = "#4CAF50"
    ctx.fillRect(w * 0.35, 0, w * 0.42, h * 0.55)

    // window
    ctx.fillStyle = "#E3F2FD"
    ctx.fillRect(w * 0.4, h * 0.08, w * 0.3, h * 0.3)

    // exhaust
    ctx.fillStyle = "#333"
    ctx.fillRect(w * 0.12, h * 0.05, 6, h * 0.28)

    // wheels
    const wheelY = h - 6
    ctx.fillStyle = "#212121"
    ctx.beginPath()
    ctx.arc(w * 0.22, wheelY, h * 0.22, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(w * 0.78, wheelY, h * 0.28, 0, Math.PI * 2)
    ctx.fill()

    // wheel rims
    ctx.fillStyle = "#FFC107"
    ctx.beginPath()
    ctx.arc(w * 0.22, wheelY, h * 0.1, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(w * 0.78, wheelY, h * 0.13, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  // Helper to resume in-place instead of restarting the whole run
  const resumeInPlace = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const h = canvas.clientHeight
    const groundLine = Math.floor(h * 0.82) - 2
    const target = resumeTargetRef.current
    if (target) {
      const midY = target.gapY + target.gapHeight / 2 - cfg.tractor.h / 2
      tractorYRef.current = clamp(midY, 0, groundLine - cfg.tractor.h)
    }
    // zero vertical speed to avoid instant re-hit on resume
    tractorVYRef.current = 0
  }, [cfg.tractor.h])

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    resizeCanvas(canvas)

    let raf = 0
    let running = true

    const loop = (time) => {
      if (!running) return
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        raf = requestAnimationFrame(loop)
        return
      }

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!lastTimeRef.current) lastTimeRef.current = time
      const dt = clamp((time - lastTimeRef.current) / 1000, 0, 0.0333) // cap delta
      lastTimeRef.current = time

      // Draw background first
      drawBackground(ctx, w, h, time)

      // Idle hint
      if (state === "idle") {
        // ground baseline tractor placement
        tractorYRef.current = Math.round(h * 0.45 + Math.sin(time / 350) * 8)
        drawTractor(ctx, cfg.tractor.x, tractorYRef.current, cfg.tractor.w, cfg.tractor.h, Math.sin(time / 350) * 50)

        // Title and hint
        ctx.fillStyle = "#0D0D0D"
        ctx.font = "bold 28px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        ctx.textAlign = "center"
        ctx.fillText("Tap / Space to Start", w / 2, h * 0.3)

        ctx.fillStyle = "rgba(0,0,0,0.7)"
        ctx.font = "16px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        ctx.fillText("Guide the tractor through the corn!", w / 2, h * 0.3 + 28)

        // Scoreboard
        ctx.fillStyle = "rgba(0,0,0,0.65)"
        ctx.fillRect(w / 2 - 100, h * 0.08 - 28, 200, 44)
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        ctx.fillText(`Best: ${best}`, w / 2, h * 0.08)

        raf = requestAnimationFrame(loop)
        return
      }

      if (state === "running") {
        // Physics
        tractorVYRef.current += cfg.gravity * dt
        tractorYRef.current += tractorVYRef.current * dt

        // Clamp at top and ground instead of losing (you only lose on corn obstacles)
        const groundLine = Math.floor(h * 0.82) - 2
        if (tractorYRef.current < 0) {
          tractorYRef.current = 0
          if (tractorVYRef.current < 0) tractorVYRef.current = 0
        }
        if (tractorYRef.current + cfg.tractor.h > groundLine) {
          tractorYRef.current = groundLine - cfg.tractor.h
          if (tractorVYRef.current > 0) tractorVYRef.current = 0
        }

        // Consistent spacing: accumulate distance moved and spawn at fixed intervals
        const dx = cfg.speed * dt
        distanceSinceSpawnRef.current += dx
        if (distanceSinceSpawnRef.current >= cfg.spacing) {
          distanceSinceSpawnRef.current -= cfg.spacing
          spawnObstacle(h, w)
        }

        // Move and draw obstacles
        const tractorRect = { x: cfg.tractor.x, y: tractorYRef.current, w: cfg.tractor.w, h: cfg.tractor.h }
        let collided = false
        let collidedObstacle = null

        obstaclesRef.current = obstaclesRef.current
          .map((o) => ({ ...o, x: o.x - dx }))
          .filter((o) => o.x + o.width > -50)

        for (const o of obstaclesRef.current) {
          drawCornObstacle(ctx, o, h)

          if (!o.passed && o.x + o.width < cfg.tractor.x) {
            o.passed = true
            setScore((s) => s + 1)
          }

          const topRect = { x: o.x, y: 0, w: o.width, h: o.gapY }
          const bottomRect = { x: o.x, y: o.gapY + o.gapHeight, w: o.width, h: h - (o.gapY + o.gapHeight) }
          if (rectsOverlap(tractorRect, topRect) || rectsOverlap(tractorRect, bottomRect)) {
            collided = true
            collidedObstacle = o // Remember which pair we hit
          }
        }

        drawTractor(ctx, tractorRect.x, tractorRect.y, tractorRect.w, tractorRect.h, tractorVYRef.current)

        const livesLeft = Math.max(0, MAX_LIVES - lossCount)
        // Score chip
        ctx.fillStyle = "rgba(0,0,0,0.65)"
        ctx.fillRect(12, 12, 130, 44)
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "bold 18px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        ctx.textAlign = "left"
        ctx.fillText(`Score: ${score}`, 20, 38)
        // Lives chip
        ctx.fillStyle = "rgba(0,0,0,0.65)"
        ctx.fillRect(12 + 130 + 8, 12, 120, 44)
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(`Lives: ${livesLeft}`, 12 + 130 + 16, 38)

        if (collided) {
          // Save resume target (gap we hit) so we can safely resume inside it
          if (collidedObstacle) {
            resumeTargetRef.current = { gapY: collidedObstacle.gapY, gapHeight: collidedObstacle.gapHeight }
          }

          const elapsed = runStartRef.current ? (time - runStartRef.current) / 1000 : 0
          setLastRunTime(elapsed)
          setLastRunScore(score)

          setState("gameover")
          setBest((b) => {
            const next = Math.max(b, score)
            try {
              localStorage.setItem("tractor-best", String(next))
            } catch {}
            return next
          })

          // Update loss count and handle warning/final
          setLossCount((prev) => {
            const next = prev + 1
            if (next === 1) {
              // first loss: show 5s warning with a fun fact
              const fact = funFacts[Math.floor(Math.random() * funFacts.length)]
              setWarningFact(fact)
              setShowWarning(true)
              warningStartRef.current = performance.now()
              if (warningTimeoutRef.current) window.clearTimeout(warningTimeoutRef.current)
              warningTimeoutRef.current = window.setTimeout(() => {
                setShowWarning(false)
                setWarningFact(null)
                warningStartRef.current = null
                // Resume in place (no reset), keep score/time/obstacles
                setState((s) => {
                  if (s === "gameover") {
                    resumeInPlace()
                    if (!runStartRef.current) runStartRef.current = performance.now()
                    return "running"
                  }
                  return s
                })
                warningTimeoutRef.current = null
              }, WARNING_DURATION)
            }
            if (next >= MAX_LIVES) {
              // end game permanently on final loss
              setShowWarning(false)
              setWarningFact(null)
              if (warningTimeoutRef.current) {
                window.clearTimeout(warningTimeoutRef.current)
                warningTimeoutRef.current = null
              }
              setState("final")
            }
            return next
          })
        }
      }

      if (state === "gameover") {
        // Let the tractor fall a bit onto the ground for impact feel
        tractorVYRef.current += cfg.gravity * dt
        tractorYRef.current = clamp(
          tractorYRef.current + tractorVYRef.current * dt,
          0,
          Math.floor(h * 0.82) - cfg.tractor.h,
        )

        // Draw obstacles frozen
        for (const o of obstaclesRef.current) {
          drawCornObstacle(ctx, o, h)
        }
        drawTractor(ctx, cfg.tractor.x, tractorYRef.current, cfg.tractor.w, cfg.tractor.h, tractorVYRef.current)

        if (showWarning && lossCount === 1) {
          // Dim overlay
          const overlayX = w * 0.12
          const overlayY = h * 0.18
          const overlayW = w * 0.76
          const overlayH = h * 0.34
          ctx.fillStyle = "rgba(0,0,0,0.6)"
          ctx.fillRect(overlayX, overlayY, overlayW, overlayH)

          ctx.fillStyle = "#FFFFFF"
          ctx.textAlign = "center"
          ctx.font = "bold 24px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
          ctx.fillText("Heads up, Farmer!", w / 2, overlayY + 38)

          ctx.font = "16px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
          const text = warningFact || "Solar weather can affect farm tech."
          // wrap the fact into multiple lines
          const lines = []
          const words = text.split(" ")
          let line = ""
          const maxWidth = overlayW * 0.85
          for (const word of words) {
            const test = line ? line + " " + word : word
            if (ctx.measureText(test).width < maxWidth) {
              line = test
            } else {
              lines.push(line)
              line = word
            }
          }
          if (line) lines.push(line)
          let ty = overlayY + 72
          for (const l of lines) {
            ctx.fillText(l, w / 2, ty)
            ty += 22
          }

          const now = performance.now()
          const remaining = warningStartRef.current
            ? Math.max(0, WARNING_DURATION - (now - warningStartRef.current))
            : 0
          const pct = remaining / WARNING_DURATION
          const barW = overlayW * 0.6
          const barH = 10
          const barX = w / 2 - barW / 2
          const barY = overlayY + overlayH - 36
          // background bar
          ctx.fillStyle = "rgba(255,255,255,0.25)"
          ctx.fillRect(barX, barY, barW, barH)
          // progress fill
          ctx.fillStyle = "#4CAF50"
          ctx.fillRect(barX, barY, barW * pct, barH)

          ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
          ctx.fillStyle = "rgba(255,255,255,0.85)"
          ctx.fillText("Game resumes when the bar empties.", w / 2, barY - 10)
        } else {
          // Game Over overlay
          ctx.fillStyle = "rgba(0,0,0,0.55)"
          ctx.fillRect(w * 0.15, h * 0.22, w * 0.7, h * 0.28)
          ctx.fillStyle = "#FFFFFF"
          ctx.textAlign = "center"
          ctx.font = "bold 30px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
          ctx.fillText("Game Over", w / 2, h * 0.22 + 44)
          ctx.font = "18px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
          ctx.fillText(`Score: ${score}   Best: ${best}`, w / 2, h * 0.22 + 80)
          ctx.fillText("Tap / click / Space to play again", w / 2, h * 0.22 + 116)
        }
      }

      if (state === "final") {
        // background already drawn above
        // draw frozen obstacles
        for (const o of obstaclesRef.current) {
          drawCornObstacle(ctx, o, h)
        }
        drawTractor(ctx, cfg.tractor.x, tractorYRef.current, cfg.tractor.w, cfg.tractor.h, tractorVYRef.current)

        ctx.fillStyle = "rgba(0,0,0,0.7)"
        ctx.fillRect(w * 0.12, h * 0.2, w * 0.76, h * 0.4)
        ctx.fillStyle = "#FFFFFF"
        ctx.textAlign = "center"
        ctx.font = "bold 30px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        ctx.fillText("Thanks for Playing!", w / 2, h * 0.2 + 44)

        ctx.font = "18px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        const timeText = `Time: ${lastRunTime.toFixed(1)}s`
        ctx.fillText(`Final Score: ${lastRunScore}`, w / 2, h * 0.2 + 84)
        ctx.fillText(timeText, w / 2, h * 0.2 + 112)

        ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        ctx.fillStyle = "rgba(255,255,255,0.85)"
        ctx.fillText("Reload the page to start over.", w / 2, h * 0.2 + 152)
      }

      raf = requestAnimationFrame(loop)
    }

    const onResize = () => resizeCanvas(canvas)
    window.addEventListener("resize", onResize)
    raf = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [
    best,
    cfg.flap,
    cfg.gravity,
    cfg.gapHeight,
    cfg.obstacleWidth,
    cfg.spacing,
    cfg.speed,
    cfg.tractor.h,
    cfg.tractor.w,
    cfg.tractor.x,
    resizeCanvas,
    spawnObstacle,
    state,
    score,
    showWarning,
    lossCount,
    lastRunTime,
  ])

  // Ensure the 5s warning auto-resume persists across re-renders
  useEffect(() => {
    if (state === "gameover" && showWarning && lossCount === 1) {
      const now = performance.now()
      const started = warningStartRef.current ?? now
      const remaining = Math.max(0, WARNING_DURATION - (now - started))

      if (warningTimeoutRef.current == null) {
        warningTimeoutRef.current = window.setTimeout(() => {
          setShowWarning(false)
          setWarningFact(null)
          warningStartRef.current = null
          // Resume in place here as well (in case this recreates after re-render)
          setState((s) => {
            if (s === "gameover") {
              resumeInPlace()
              if (!runStartRef.current) runStartRef.current = performance.now()
              return "running"
            }
            return s
          })
          warningTimeoutRef.current = null
        }, remaining)
      }
    }
  }, [state, showWarning, lossCount, resumeInPlace])

  // Clear warning timeout only on unmount to prevent leaks (not during state changes)
  useEffect(() => {
    return () => {
      if (warningTimeoutRef.current) {
        window.clearTimeout(warningTimeoutRef.current)
        warningTimeoutRef.current = null
      }
    }
  }, [])

  return (
    <div className="w-full rounded-lg border border-black/10 bg-background p-3">
      <canvas
        ref={canvasRef}
        aria-label="Tractor in a corn field game canvas"
        role="img"
        style={{ display: "block", width: "100%", height: "auto", borderRadius: 8 }}
      />
      <div className="mt-3 flex items-center justify-between text-sm opacity-70">
        <span>Controls: Tap / Click / Space</span>
        <span>Avoid the corn and beat your best score!</span>
      </div>
    </div>
  )
}
