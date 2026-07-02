"use client";

import { useState, useEffect } from "react";

export function usePrompt() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement usePrompt logic
  }, []);

  return { data, loading };
}

export default usePrompt;
