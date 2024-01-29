"use client";
import AppTable from "@/components/app.table";
import React from "react";
import axios from "axios";
import useSWR from "swr";
function Blogs() {
  const fetcher = async (url: string) => (await axios.get(url)).data;
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // console.log(data);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      {" "}
      <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </div>
  );
}

export default Blogs;
