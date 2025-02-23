import { useNavigate } from "react-router-dom"
import { ArrowRight, Shield, RefreshCcw, FileCheck, Store, User } from "lucide-react"
import { GoogleGeminiEffectDemo } from "../components/compo/gemini-effect"
import { CardHoverEffectDemo } from "../components/compo/card"
import Footer from "../components/Footer"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-600">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Secure Diamond Authentication System
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-300">
          Track and verify diamond authenticity from processing to consumer with blockchain technology and biometric
          security.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            Sign Up
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900">Secure Diamond Journey</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <WorkflowStep icon={Shield} title="Processing" description="Initial scanning and blockchain registration" />
            <WorkflowStep icon={RefreshCcw} title="Polishing" description="Condition updates and quality control" />
            <WorkflowStep icon={FileCheck} title="Certification" description="Verification and certificate issuance" />
            <WorkflowStep icon={Store} title="Retailer" description="Final quality check and sale" />
            <WorkflowStep icon={User} title="Consumer" description="Authentication via QR code" />
          </div>
        </div>
      </div>
      <GoogleGeminiEffectDemo/>
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
      <h2 className=" text-center text-3xl font-bold text-white">Features</h2>
        {/* <div className="grid gap-8 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm md:grid-cols-2 lg:grid-cols-3">
          <Feature title="Blockchain Security" description="Immutable record of ownership and authenticity" />
          <Feature title="Biometric Verification" description="Advanced security for ownership transfers" />
          <Feature title="Role-Based Access" description="Specialized dashboards for each stakeholder" />
          <Feature title="Real-time Tracking" description="Monitor diamond journey at every stage" />
          <Feature title="Digital Certificates" description="Secure storage of certification documents" />
          <Feature title="Consumer Verification" description="Easy authentication via QR codes" />
          
        </div> */}
          <CardHoverEffectDemo/>
      </div> 
      <Footer/>     
    </div>
  )
}

function WorkflowStep({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-zinc-100 p-3">
        <Icon className="h-6 w-6 text-zinc-900" />
      </div>
      <h3 className="mb-2 font-medium text-zinc-900">{title}</h3>
      <p className="text-sm text-zinc-600">{description}</p>
    </div>
  )
}

function Feature({ title, description }) {
  return (
    <div className="rounded-lg p-4">
      <h3 className="mb-2 font-medium text-zinc-900">{title}</h3>
      <p className="text-sm text-zinc-600">{description}</p>
    </div>
  )
}

export default Home

