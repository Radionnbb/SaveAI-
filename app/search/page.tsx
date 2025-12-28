"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles, Search, ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import AlternativeCard from "@/components/alternative-card"
import Loading from "@/components/loading"
import LiveAgentStep from "@/components/live-agent-step"

// Mock data for demonstration
const mockOriginalProduct = {
  productName: "Sony WH-1000XM5 Wireless Headphones",
  price: 399.99,
  store: "Amazon",
  imageURL: "/wireless-headphones.png",
  affiliateLink: "https://example.com/affiliate/sony-headphones",
}

const mockAlternatives = [
  {
    productName: "Sony WH-1000XM5 Wireless Headphones",
    price: 369.99,
    store: "Best Buy",
    imageURL: "/wireless-headphones.png",
    affiliateLink: "https://example.com/affiliate/sony-bestbuy",
  },
  {
    productName: "Sony WH-1000XM5 Wireless Headphones",
    price: 379.99,
    store: "B&H Photo",
    imageURL: "/wireless-headphones.png",
    affiliateLink: "https://example.com/affiliate/sony-bh",
  },
  {
    productName: "Bose QuietComfort 45",
    price: 329.99,
    store: "Amazon",
    imageURL: "/premium-headphones.png",
    affiliateLink: "https://example.com/affiliate/bose",
  },
  {
    productName: "Apple AirPods Max",
    price: 549.99,
    store: "Apple Store",
    imageURL: "/airpods-max.jpg",
    affiliateLink: "https://example.com/affiliate/apple",
  },
]

const analysisSteps = [
  { step: 1, label: "Analyzing product URL", status: "complete" as const },
  { step: 2, label: "Scanning 1,000+ stores", status: "complete" as const },
  { step: 3, label: "Finding alternatives", status: "complete" as const },
  { step: 4, label: "Comparing prices", status: "complete" as const },
  { step: 5, label: "Generating results", status: "complete" as const },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(false)
    setCurrentStep(0)

    // Simulate AI analysis steps
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i + 1)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    setIsSearching(false)
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SaveAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Find the Best Deals</h1>
            <p className="text-muted-foreground text-lg">Paste a product URL or search by keyword</p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Paste product URL or enter keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 text-base"
              disabled={isSearching}
            />
            <Button type="submit" size="lg" disabled={isSearching}>
              <Search className="mr-2 size-4" />
              Search
            </Button>
          </form>
        </div>

        {/* Loading / Live Agent Analysis */}
        {isSearching && (
          <Card className="max-w-3xl mx-auto p-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Loading />
                <h3 className="text-lg font-semibold">AI Analysis in Progress</h3>
              </div>
              <div className="space-y-3">
                {analysisSteps.map((stepData, index) => (
                  <LiveAgentStep
                    key={index}
                    step={stepData.step}
                    label={stepData.label}
                    status={index < currentStep ? "complete" : index === currentStep ? "active" : "pending"}
                  />
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Results Section */}
        {hasSearched && !isSearching && (
          <div className="space-y-8">
            {/* Original Product */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Original Product</h2>
              <div className="max-w-md">
                <ProductCard {...mockOriginalProduct} />
              </div>
            </div>

            {/* Alternative Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Better Deals Found</h2>
                <p className="text-muted-foreground">Showing {mockAlternatives.length} alternatives</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockAlternatives.map((product, index) => (
                  <AlternativeCard key={index} {...product} />
                ))}
              </div>
            </div>

            {/* Cheapest Option CTA */}
            <Card className="p-6 bg-primary/10 border-primary/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Best Deal Found!</h3>
                  <p className="text-muted-foreground">
                    Save ${(mockOriginalProduct.price - mockAlternatives[0].price).toFixed(2)} by purchasing from{" "}
                    {mockAlternatives[0].store}
                  </p>
                </div>
                <Button size="lg" asChild>
                  <a href={mockAlternatives[0].affiliateLink} target="_blank" rel="noopener noreferrer">
                    Buy Cheapest - ${mockAlternatives[0].price}
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!hasSearched && !isSearching && (
          <div className="text-center py-16">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Search className="size-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a product URL or keyword above to find the best prices across thousands of stores
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
