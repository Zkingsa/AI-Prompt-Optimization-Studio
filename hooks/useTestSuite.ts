"use client";

import { useState, useEffect } from "react";

export function useTestSuite() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement useTestSuite logic
  }, []);

  return { data, loading };
}

export default useTestSuite;
