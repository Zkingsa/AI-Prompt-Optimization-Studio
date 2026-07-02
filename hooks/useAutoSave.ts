"use client";

import { useState, useEffect } from "react";

export function useAutoSave() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: implement useAutoSave logic
  }, []);

  return { data, loading };
}

export default useAutoSave;
