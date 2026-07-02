"use client";

import { useState, useEffect } from "react";

export function useLocalStorage() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement useLocalStorage logic
  }, []);

  return { data, loading };
}

export default useLocalStorage;
