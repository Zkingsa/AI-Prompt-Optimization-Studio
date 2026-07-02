"use client";

import { useState, useEffect } from "react";

export function useDebounce() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement useDebounce logic
  }, []);

  return { data, loading };
}

export default useDebounce;
