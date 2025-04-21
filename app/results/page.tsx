"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { Confetti } from "@/components/confetti"

export default function ResultsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { address, isConnected } = useWallet()
  const [selectedHorse, setSelectedHorse] = useState<number | null>(null)
  const [winningHorse, setWinningHorse] = useState<number | null>(null)
  const [isWinner, setIsWinner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [claimed, setClaimed] = useState(false)

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
      return
    }

    const storedHorse = localStorage.getItem("selectedHorse")
    if (!storedHorse) {
      router.push("/choose-horse")
      return
    }

    setSelectedHorse(Number.parseInt(storedHorse))

    // Simulate race results (random winner)
    const simulateRace = () => {
      setLoading(true)
      setTimeout(() => {
        const winner = Math.floor(Math.random() * 9) + 1
        setWinningHorse(winner)
        setIsWinner(Number.parseInt(storedHorse) === winner)
        setLoading(false)
      }, 2000)
    }

    simulateRace()
  }, [isConnected, router])

  const handleClaimFunds = () => {
    // Simulate claiming funds
    setClaimed(true)
    toast({
      title: "Funds Claimed!",
      description: "Your winnings have been sent to your wallet.",
    })
  }

  const handlePlayAgain = () => {
    localStorage.removeItem("selectedHorse")
    router.push("/choose-horse")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-800 to-green-50 p-4 text-green-950">
        <div className="w-full max-w-md rounded-lg bg-white/90 p-8 text-center shadow-lg backdrop-blur-sm">
          <h1 className="mb-8 text-3xl font-bold text-green-800">Race in Progress</h1>
          <div className="flex justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-green-500"></div>
          </div>
          <p className="mt-6 text-green-700">The horses are racing! Please wait...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-50 p-4 text-green-950">
      {isWinner && !claimed && <Confetti />}
      <div className="mx-auto max-w-2xl">

        <div className="mb-3 text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-2 rounded">
          <h1 className="text-3xl font-bold text-white italic">RACE RESULTS</h1>
        </div>

        <Card className="overflow-hidden bg-white/90 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-green-700">
                {isWinner ? "Congratulations! You Won! 🏆" : "Better luck next time! 🐎"}
              </h2>

              <div className="my-6 flex justify-center">
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-green-500">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Winning Horse"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2 text-green-800">
                <p>You selected Horse #{selectedHorse}</p>
                <p>Winning Horse: #{winningHorse}</p>
              </div>

              <div className="mt-8 space-y-4">
                {isWinner && !claimed ? (
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleClaimFunds}>
                    Claim Your Funds
                  </Button>
                ) : isWinner && claimed ? (
                  <div className="rounded-md bg-green-100 p-4 text-green-800">Funds claimed successfully!</div>
                ) : (
                  <div className="rounded-md bg-red-100 p-4 text-red-800">Your horse didn't win this time.</div>
                )}

                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-700 hover:bg-green-100"
                  onClick={handlePlayAgain}
                >
                  Play Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
