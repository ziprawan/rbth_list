"use client";

import { RTBHDetails } from "@/types/rtbh";
import Link from "next/link";
import { useState } from "react";

export default function RTBHDetail({ rtbh, type }: { rtbh: RTBHDetails; type: "valid" | "private" }) {
  const [open, setOpen] = useState<boolean>(false);
  const isPrivate = type === "private";

  return (
    <div className="mb-2">
      <div className="flex justify-between underline decoration-blue-500">
        <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
          {isPrivate ? (
            <>
              {rtbh.link} {rtbh.org} <span className="font-bold">[PRIVATE]</span>
            </>
          ) : (
            rtbh.asn
          )}
        </div>
        <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
          v
        </div>
      </div>
      {open && (
        <div className="ml-2">
          <div>Organization: {rtbh.org}</div>
          <div>Source IP: {rtbh.ip}</div>
          <div>Router ID: {rtbh.id}</div>
          <div>Since: {rtbh.since}</div>
          <div>Routes: {rtbh.routes}</div>
          <div>
            <Link href={`https://bgp.he.net/${rtbh.link}`} className="text-blue-500 underline" target="_blank">
              Link
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
