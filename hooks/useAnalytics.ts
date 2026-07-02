"use client";

import { useState, useEffect } from "react";

export function useAnalytics() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement useAnalytics logic
  }, []);

  return { data, loading };
}

export default useAnalytics;
