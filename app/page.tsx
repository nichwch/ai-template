"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ForestGameStart } from "./GameStates";

import SettingsModal, { getStoredApiKey, hasApiKey } from "./SettingsModal";

export default function Home() {

  // Settings modal and API key state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [hasValidApiKey, setHasValidApiKey] = useState(false);

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

  return (
    <div className="text-gray-500 h-screen flex flex-col">
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
      <div className="flex flex-row h-full p-4">Hello world!</div>
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onApiKeyChange={handleApiKeyChange}
      />
    </div>
  );
}
