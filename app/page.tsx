"use client";
import { useState, useEffect } from "react";

import SettingsModal, { getStoredApiKey, hasApiKey } from "./SettingsModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {

  // Settings modal and API key state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [hasValidApiKey, setHasValidApiKey] = useState(false);
  
  // API testing state
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Check for API key on mount
  useEffect(() => {
    const storedKey = getStoredApiKey();
    setApiKey(storedKey);
    setHasValidApiKey(hasApiKey());
  }, []);

  // Handle API key changes
  const handleApiKeyChange = (newApiKey: string | null) => {
    setApiKey(newApiKey);
    setHasValidApiKey(newApiKey !== null);
  };

  // Function to test the API route
  const testApiRoute = async () => {
    if (!apiKey) {
      setApiResponse("Error: No API key available");
      return;
    }

    setIsLoadingApi(true);
    setApiResponse(null);

    try {
      const response = await fetch('/api/sample-ai-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setApiResponse(`Error: ${data.error}`);
      } else {
        setApiResponse(data.story);
      }
    } catch (error) {
      setApiResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingApi(false);
    }
  };

  return (
    <div className="text-gray-500 flex flex-col">
      {/* navbar */}
      <div className="px-4 flex items-center border-b border-gray-500 sticky top-0 bg-white gap-2">
        <h1 className="font-semibold">ai template</h1>
        <a
          className="ml-auto"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nichwch/ai-template"
        >
          fork on github
        </a>
        <button
          className={`cursor-pointer disabled:opacity-50 ${
            !hasValidApiKey ? "text-red-500 font-semibold" : ""
          }`}
          onClick={() => setIsSettingsOpen(true)}
        >
          {!hasValidApiKey ? "api key required" : "api key"}
        </button>
      </div>
      <div className="p-4 overflow-auto">
        <div className='w-[450px] mx-auto space-y-6 pb-10'>
          <div className="space-y-2">
            <h1>Hello world!</h1>
            <p>This is a template repo for creating AI apps that allow users to enter their own OpenRouter keys.</p>
            <p>Here are some components this template ships with:</p>
          </div>

          {/* Button Examples */}
          <div className="space-y-3">
            <h2 className="font-semibold">Button Examples</h2>
            <div className="flex flex-wrap gap-2">
              <Button>Default Button</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default Size</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🚀</Button>
            </div>
          </div>

          {/* Dialog Example */}
          <div className="space-y-3">
            <h2 className="font-semibold">Dialog Example</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Example Dialog</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <p>Dialog content goes here. You can add forms, text, or any other content.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tooltip Example */}
          <div className="space-y-3">
            <h2 className="font-semibold">Tooltip Example</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover for tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a helpful tooltip!</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* HoverCard Example */}
          <div className="space-y-3">
            <h2 className="font-semibold">HoverCard Example</h2>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline">Hover for card</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Hover Card</h4>
                  <p className="text-sm">
                    This is a hover card that can contain more detailed information, 
                    links, or any other content you want to show on hover.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Carousel Example */}
          <div className="space-y-3">
            <h2 className="font-semibold">Carousel Example</h2>
            <Carousel className="w-full mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-6 border text-center">
                    <h3 className="font-semibold">Slide 1</h3>
                    <p className="text-sm mt-2">First carousel item</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-6 border  text-center">
                    <h3 className="font-semibold">Slide 2</h3>
                    <p className="text-sm mt-2">Second carousel item</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-6 border text-center">
                    <h3 className="font-semibold">Slide 3</h3>
                    <p className="text-sm mt-2">Third carousel item</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* API Test Section */}
          <div className="space-y-3 border-t pt-6">
            <h2 className="font-semibold">API Route Test</h2>
            <p className="text-sm">Test the sample AI route using your API key:</p>
            <Button 
              onClick={testApiRoute}
              disabled={!hasValidApiKey || isLoadingApi}
              className="w-full"
            >
              {isLoadingApi ? "Calling AI..." : "Test AI Route"}
            </Button>
            
            {apiResponse && (
              <div className="mt-4 p-4 border bg-gray-50">
                <h3 className="font-semibold mb-2">API Response:</h3>
                <p className="text-sm whitespace-pre-wrap">{apiResponse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onApiKeyChange={handleApiKeyChange}
      />
    </div>
  );
}
