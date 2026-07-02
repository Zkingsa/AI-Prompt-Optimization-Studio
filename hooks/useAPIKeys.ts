"use client";

import { useState, useEffect } from "react";

export function useAPIKeys() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement useAPIKeys logic
  }, []);

  return { data, loading };
}

export default useAPIKeys;
