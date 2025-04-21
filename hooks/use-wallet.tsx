"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type WalletContextType = {
  address: string | null
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Check for existing connection on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setAddress(savedAddress)
      setIsConnected(true)
    }
  }, [])

  // In a real app, this would use ethers.js or wagmi to connect to MetaMask or WalletConnect
  const connect = async () => {
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a mock Ethereum address
    const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    setAddress(mockAddress)
    setIsConnected(true)
    localStorage.setItem("walletAddress", mockAddress)

    return mockAddress
  }

  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
    localStorage.removeItem("walletAddress")
  }

  return (
    <WalletContext.Provider value={{ address, isConnected, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}
