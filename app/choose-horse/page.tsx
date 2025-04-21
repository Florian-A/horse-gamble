"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { LogOut } from "lucide-react"

const horses = [
  { id: 1, name: "Thunder Bolt", odds: 3.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Silver Arrow", odds: 5.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Golden Hoof", odds: 2.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Midnight Star", odds: 7.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Royal Gallop", odds: 4.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Desert Wind", odds: 10.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 7, name: "Mountain Spirit", odds: 8.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 8, name: "Ocean Rider", odds: 6.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 9, name: "Forest Runner", odds: 12.5, image: "/placeholder.svg?height=200&width=200" },
]

export default function ChooseHorsePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { address, isConnected, disconnect } = useWallet()

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  const handleSelectHorse = (horseId: number) => {
    // In a real app, you might want to store this in a more persistent way
    localStorage.setItem("selectedHorse", horseId.toString())

    toast({
      title: "Horse Selected!",
      description: `You've selected horse #${horseId}. Good luck!`,
    })

    // Redirect to results page
    router.push("/results")
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully.",
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-50 p-4 text-green-950">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex flex-col items-center">

          <div className="w-full mb-3 text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-2 rounded">
            <h1 className="text-3xl font-bold text-white italic">CHOOSE YOUR HORSE</h1>
          </div>
          {address && (
            <div className="mt-2 flex items-center gap-2">
              <p className="text-sm text-white">
                Connected: {address.slice(0, 6)}...{address.slice(-4)}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="ml-2 h-8 border-green-300 text-green-700 hover:bg-green-50"
                onClick={handleDisconnect}
              >
                <LogOut className="mr-1 h-3 w-3" />
                Disconnect
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white/90 p-4 shadow-lg">
          <div className="mb-4 grid grid-cols-3 gap-4 border-b border-green-200 pb-2 text-sm font-semibold text-green-800">
            <div>Horse #</div>
            <div>Name</div>
            <div className="text-right">Odds</div>
          </div>

          <div className="space-y-3">
            {horses.map((horse) => (
              <div
                key={horse.id}
                className="grid grid-cols-3 items-center gap-4 rounded-md border border-green-100 bg-white p-3 shadow-sm transition-all hover:border-green-300 hover:shadow"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                    {horse.id}
                  </div>
                </div>

                <div>
                  <p className="font-medium">{horse.name}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-green-700">{horse.odds.toFixed(1)}</span>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleSelectHorse(horse.id)}
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
