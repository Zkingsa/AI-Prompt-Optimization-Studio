"use client";

import { useState, useEffect } from "react";

export function useWebSocket() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement useWebSocket logic
  }, []);

  return { data, loading };
}

export default useWebSocket;
