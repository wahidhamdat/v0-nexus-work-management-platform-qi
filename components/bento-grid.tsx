"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { FileText, Ship, Package, BarChart3, Cpu, Clock } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function QuoteSimulation() {
  const [stage, setStage] = useState(0)
  const stages = ["Receiving RFQ...", "Checking carrier rates...", "Comparing routes...", "Quote ready!"]

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [stages.length])

  return (
    <div className="flex flex-col gap-2 mt-4">
      {stages.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= stage ? "bg-[#00e5a0]" : "bg-[#1e2736]"
            }`}
          />
          <span
            className={`text-sm transition-colors duration-300 ${
              i <= stage ? "text-[#e8ecf1]" : "text-[#5a6478]"
            }`}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  )
}

function LiveMetric() {
  const [value, setValue] = useState(3.8)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.round((3.5 + Math.random() * 1) * 10) / 10)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-baseline gap-1 mt-4">
      <span className="text-3xl font-bold text-[#00e5a0] font-mono">{value}</span>
      <span className="text-sm text-[#5a6478]">min avg</span>
    </div>
  )
}

export function BentoGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="agents" className="py-24 px-6 bg-[#06090f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#e8ecf1] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Meet Your Digital Employees
          </h2>
          <p className="text-[#8892a4] max-w-2xl mx-auto">
            AI agents purpose-built for freight operations. Each one replaces hours of manual work — without replacing
            your team.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Large card - Quoting Agent */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-6 rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="p-2 rounded-lg bg-[#1a2332] w-fit mb-4">
                  <FileText className="w-5 h-5 text-[#00e5a0]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#e8ecf1] mb-2">Quoting Agent</h3>
                <p className="text-[#8892a4] text-sm max-w-md">
                  Reads inbound RFQs, matches carrier rates, compares routes, and returns accurate quotes in under 4
                  minutes.
                </p>
              </div>
              <LiveMetric />
            </div>
            <QuoteSimulation />
          </motion.div>

          {/* Carrier Management */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-[#1a2332] w-fit mb-4">
              <Ship className="w-5 h-5 text-[#00e5a0]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-[#e8ecf1] mb-2">Carrier Juggler</h3>
            <p className="text-[#8892a4] text-sm mb-4">
              Manages carrier relationships, tracks rate changes, and automatically selects the best option.
            </p>
            <div className="flex items-center gap-2 text-[#00e5a0] text-sm">
              <span className="font-mono">40+</span>
              <span className="text-[#5a6478]">carriers connected</span>
            </div>
          </motion.div>

          {/* Container Tracking */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-[#1a2332] w-fit mb-4">
              <Package className="w-5 h-5 text-[#00e5a0]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-[#e8ecf1] mb-2">Container Tracker</h3>
            <p className="text-[#8892a4] text-sm mb-4">
              Real-time visibility across ocean, air, and road. Proactive alerts before delays happen.
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs bg-[#1a2332] rounded text-[#8892a4]">Ocean</span>
              <span className="px-2 py-1 text-xs bg-[#1a2332] rounded text-[#8892a4]">Air</span>
              <span className="px-2 py-1 text-xs bg-[#1a2332] rounded text-[#8892a4]">Road</span>
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-[#1a2332] w-fit mb-4">
              <BarChart3 className="w-5 h-5 text-[#00e5a0]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-[#e8ecf1] mb-2">Ops Dashboard</h3>
            <p className="text-[#8892a4] text-sm mb-4">
              One dashboard for all agent activity. Full visibility, complete human override at any time.
            </p>
            <div className="flex items-center gap-2 text-[#00e5a0] text-sm">
              <span className="font-mono">100%</span>
              <span className="text-[#5a6478]">human control</span>
            </div>
          </motion.div>

          {/* Speed */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-[#1a2332] w-fit mb-4">
              <Clock className="w-5 h-5 text-[#00e5a0]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-[#e8ecf1] mb-2">24/7 Operations</h3>
            <p className="text-[#8892a4] text-sm mb-4">
              Your digital employees never sleep. Quotes go out at 2am, carriers get pinged on weekends.
            </p>
            <div className="flex items-center gap-2 text-[#00e5a0] text-sm">
              <Cpu className="w-4 h-4" />
              <span className="text-[#5a6478]">Always online</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
