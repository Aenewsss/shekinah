import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastContainer } from "react-toastify"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shekinah - Experiência Executiva Sobre Rodas",
  description: "Alugue SUVs e sedans executivos com serviço de qualidade e motoristas para seus trajetos.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
      {/* <ToastContainer /> */}
    </html>
  )
}
