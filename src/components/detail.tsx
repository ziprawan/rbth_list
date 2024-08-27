"use client";

import { RBTHDetails } from "@/types/rbth";
import Link from "next/link";
import { useState } from "react";

export default function RBTHDetail({ rbth, type }: { rbth: RBTHDetails; type: "valid" | "private" }) {
  const [open, setOpen] = useState<boolean>(false);
  const isPrivate = type === "private";

  return (
    <div className="mb-2">
      <div className="flex justify-between underline decoration-blue-500">
        <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
          {isPrivate ? (
            <>
              {rbth.link} {rbth.org} <span className="font-bold">[PRIVATE]</span>
            </>
          ) : (
            rbth.asn
          )}
        </div>
        <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
          v
        </div>
      </div>
      {open && (
        <div className="ml-2">
          <div>Organization: {rbth.org}</div>
          <div>Source IP: {rbth.ip}</div>
          <div>Router ID: {rbth.id}</div>
          <div>Since: {rbth.since}</div>
          <div>Routes: {rbth.routes}</div>
          <div>
            <Link href={`https://bgp.he.net/${rbth.link}`} className="text-blue-500 underline" target="_blank">
              Link
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
