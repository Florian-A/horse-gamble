"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { Wallet } from "lucide-react"

export function ConnectWallet() {
  const router = useRouter()
  const { toast } = useToast()
  const { connect, address, isConnected } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      await connect()

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully!",
      })

      // Redirect to horse selection page
      router.push("/choose-horse")
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {isConnected ? (
        <div className="space-y-4 text-center">
          <div className="rounded-lg bg-green-100 p-4 text-green-800">
            <p className="mb-2">Wallet Connected</p>
            <p className="font-mono text-sm">
              {address?.slice(0, 10)}...{address?.slice(-8)}
            </p>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => router.push("/choose-horse")}>
            Place Your Bet
          </Button>
        </div>
      ) : (
        <Button
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <span className="flex items-center">
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Connecting...
            </span>
          ) : (
            <span className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </span>
          )}
        </Button>
      )}
    </div>
  )
}
