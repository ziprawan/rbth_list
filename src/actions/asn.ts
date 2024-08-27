"use server";

import { RTBHDetails } from "@/types/rtbh";

const BASE_API = "http://103.158.253.146:40011/neighbor2.json";

export async function getRBTHData() {
  // Maybe I'll use database caching
  try {
    const resp = await fetch(BASE_API);
    const json = await resp.json();

    return json as RTBHDetails[];
  } catch (err) {
    return (err as Error).message;
  }
}
