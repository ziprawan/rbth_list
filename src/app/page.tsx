"use client";

import { getRTBHData } from "@/actions/asn";
import RTBHDetail from "@/components/detail";
import { RTBHDetails } from "@/types/rtbh";
import { useEffect, useState } from "react";

export default function DetailsPage() {
  const [data, setData] = useState<RTBHDetails[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const [includePrivate, setIncludePrivate] = useState<boolean>(false);

  async function fetchData() {
    const res = await getRTBHData();

    if (typeof res === "string") setErr(res);
    else setData(res.filter((r) => !r.asn.toLowerCase().includes("invalid")));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-[2vh] ml-2 mr-2 text-sm md:text-xl">
      <div className="mb-3 pb-1 border-b border-black">RTBH-1 MTen</div>
      <div className="flex flex-col gap-2 mb-3 pb-2 border-b border-black">
        <div className="flex gap-2">
          Search
          <input
            disabled={data === null}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-black disabled:bg-[#f4f4f4]"
            type="text"
          />
        </div>
        <div className="flex gap-2">
          <input onChange={(e) => setIncludePrivate(e.target.checked)} checked={includePrivate} type="checkbox" />
          Include private?
        </div>
      </div>
      {err ? (
        <div>Error! {err}</div>
      ) : data ? (
        data
          .filter((d) => (!includePrivate ? !d.asn.toLowerCase().includes("private") : true))
          .filter((d) => {
            const isPrivate = d.asn.toLowerCase().includes("private");

            return (isPrivate ? d.org : d.asn).toLowerCase().includes(search.toLowerCase());
          })
          .map((d) => {
            const type = d.asn.toLowerCase().includes("private") ? "private" : "valid";
            return <RTBHDetail key={d.asn + d.id + d.ip} type={type} rtbh={d} />;
          })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
