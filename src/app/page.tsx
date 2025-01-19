'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';
import { generateSecret } from '~/lib/generate-secret';
import { ny } from '~/lib/utils';
import { ThemeToggle } from "~/components/theme-toggle"

const SECRET_LENGTHS = [16, 32, 64, 128];

export default function Home() {
  const [selectedLength, setSelectedLength] = useState(32);
  const [secret, setSecret] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateAndCopySecret = async (length: number) => {
    const newSecret = await generateSecret(length);
    setSecret(newSecret);
    await navigator.clipboard.writeText(newSecret);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    toast.success('Secret copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center text-foreground">
          Secret Generator
        </h1>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {SECRET_LENGTHS.map((length) => (
            <Button
              key={length}
              variant="secondary"
              onClick={() => {
                setSelectedLength(length);
                generateAndCopySecret(length);
              }}
              className={ny(
                "text-lg",
                selectedLength === length && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {length} characters
            </Button>
          ))}
        </div>

        <div className="h-[172px]">
          {secret ? (
            <Button
              variant="rainbow-outline"
              onClick={() => generateAndCopySecret(selectedLength)}
              className={ny(
                "w-full p-12 bg-card rounded-lg shadow-lg cursor-pointer relative overflow-hidden transition-all hover:scale-105",
                "after:absolute after:inset-0 after:bg-copy/20 after:transform",
                isAnimating ? "after:translate-x-0 after:opacity-100" : "after:-translate-x-full after:opacity-0",
                "after:transition-all after:duration-500 after:ease-out"
              )}
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click to generate new secret
                </p>
                <p className="font-mono break-all relative z-10">
                  {secret}
                </p>
              </div>
            </Button>
          ) : (
            <div className="w-full p-12 bg-card/50 rounded-lg border-2 border-dashed border-muted-foreground/20">
              <div className="space-y-4 text-center text-muted-foreground">
                <p className="text-sm">Select length to generate a secret</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
