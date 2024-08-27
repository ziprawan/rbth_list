"use client";

import { getRBTHData } from "@/actions/asn";
import RBTHDetail from "@/components/detail";
import { RBTHDetails } from "@/types/rbth";
import { useEffect, useState } from "react";

export default function DetailsPage() {
  const [data, setData] = useState<RBTHDetails[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);

  async function fetchData() {
    const res = await getRBTHData();

    if (typeof res === "string") setErr(res);
    else setData(res.filter((r) => !r.asn.toLowerCase().includes("invalid")));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-[2vh] ml-2 mr-2 text-sm md:text-xl">
      <div className="mb-3 pb-1 border-b border-black">RBTH-1 MTen</div>
      <div className="flex gap-2 mb-3 pb-2 border-b border-black">
        Search
        <input
          disabled={data === null}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black disabled:bg-[#f4f4f4]"
          type="text"
        />
      </div>
      {err ? (
        <div>Error! {err}</div>
      ) : data ? (
        data
          .filter((d) => {
            const isPrivate = d.asn.toLowerCase().includes("private");

            return (isPrivate ? d.org : d.asn).toLowerCase().includes(search.toLowerCase());
          })
          .map((d) => {
            const type = d.asn.toLowerCase().includes("private") ? "private" : "valid";
            return <RBTHDetail key={d.asn + d.id + d.ip} type={type} rbth={d} />;
          })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
