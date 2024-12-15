import React, { useEffect, useState } from "react";

interface ErrorDisplayProps {
  errors: (unknown | null | undefined)[];
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);

  // Filtra, consolida e remove mensagens duplicadas
  const errorMessage = Array.from(
    new Set(
      errors
        .filter((error) => error instanceof Error)
        .map((error) => (error as Error).message)
    )
  ).join("; ") || null;

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
      setProgress(100);
      const timer = setTimeout(() => setVisible(false), 5000);
      const intervalId = setInterval(() => {
        setProgress((prev) => Math.max(0, prev - 1));
      }, 50);

      return () => {
        clearTimeout(timer);
        clearInterval(intervalId);
      };
    }
  }, [errorMessage]);

  if (!errorMessage || !visible) return null;

  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded fixed z-50">
      <p className="font-bold">Erro:</p>
      <p>{errorMessage}</p>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-300">
        <div
          className="h-full bg-red-600"
          style={{
            width: `${progress}%`,
            transition: "width 50ms linear",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
