import { ConnectWallet } from "@/components/connect-wallet"

export default function ConnectWalletPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          // backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundImage: "url('/home.jpg?height=1080&width=1920')",
          filter: "brightness(0.3)",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-md px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-md"><i>BET ON YOUR FAVORITE HORSE</i></h1>
        <p className="mb-8 text-xl text-white drop-shadow-md">
        Place your bets on your favorite horse with the speed and security of the Solana blockchain. 
        </p>
        <div className="rounded-lg bg-white/10 p-8 backdrop-blur-sm">
          <ConnectWallet />
        </div>
      </div>
    </div>
  )
}
