"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DisplayCard from "@/components/app/display-card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";

export default function Home() {
  const [data, setData] = useState<any>({});
  const [docs, setDocs] = useState<any>([]);
  const [query, setQuery] = useState({
    query: {},
    options: {},
  });
  const debouncedQuery = useDebounce(query, 300);
  const arrName = "SpaceX_Favourite_Launches";
  const [favourites, setFavourites] = useState<string[]>([]);
  useEffect(() => {
    const favObj = localStorage.getItem(arrName);
    if (favObj) {
      setFavourites(() => JSON.parse(favObj).fav);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      console.log("called function with query: ", query);
      try {
        const fetchData = await axios.post(
          "https://api.spacexdata.com/v5/launches/query",
          query
        );
        console.log(fetchData);
        setData(fetchData.data);
        setDocs(fetchData.data.docs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedQuery]);
  console.log(data);
  return (
    <div className="bg-zinc-900 min-h-screen ">
      {/* Navbar */}
      <div className="bg-background  md:py-4 md:px-8 px-4 py-2 gap-4  flex justify-between md:flex-row flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold lg:text-2xl text-xl ">
            Atmosly - SpaceX Mission Explorer
          </h1>
          <p className="md:text-sm text-xs mx-1 w-3/4">
            Fetch real data from SpaceX public API, Filter, explore, and
            favourite launches.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            onCheckedChange={(c) => {
              if (c) {
                setData((prev: any) => ({
                  ...prev,
                  docs: prev.docs.filter((doc: any) =>
                    favourites.includes(doc.id)
                  ),
                }));
              } else {
                setData((prev: any) => ({
                  ...prev,
                  docs: docs,
                }));
              }
            }}
            id="show-favourites"
          />
          <Label htmlFor="show-favourites">Show favourites</Label>
        </div>
      </div>

      {/* Main body */}
      <div className="container mx-auto my-8 flex flex-col gap-8 px-4 py-8 ">
        {/* Search bar, select year, and successful only toggle */}
        <div className="flex md:flex-row flex-col gap-6 ">
          <div className="flex-1">
            <span className="">Search by mission name</span>
            <Input
              onChange={(e) => {
                setQuery((prev) => ({
                  query: {
                    ...prev.query,
                    name: {
                      $regex: `^${e.target.value}`,
                      $options: "i",
                    },
                    options: prev.options,
                  },

                  options: {},
                }));
              }}
              type="text"
              placeholder="e.g., Starlink, CRS, Demo..."
            />
          </div>
          <div className="flex-1">
            <span className="">Year</span>
            <Select
              onValueChange={(value) => {
                console.log("fired");
                if (value === "all-years")
                  setQuery((prev) => ({
                    query: {},
                    options: {
                      ...prev.options,
                    },
                  }));
                else
                  setQuery((prev) => ({
                    query: {
                      ...prev.query,
                      date_utc: {
                        $gte: value + "-01-01T00:00:00.000Z",
                        $lte: value + "-12-31T00:00:00.000Z",
                      },
                    },
                    options: prev.options,
                  }));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Years</SelectLabel>
                  <SelectItem value="all-years">All years</SelectItem>
                  {Array.from({ length: 100 }, (_, k) => k + 1)
                    .reverse()
                    .map(
                      (i, _) =>
                        i + 2005 <= new Date().getFullYear() && (
                          <SelectItem value={(i + 2005).toString()} key={_}>
                            {i + 2005}
                          </SelectItem>
                        )
                    )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center  space-x-2  ">
            <Switch
              onCheckedChange={(c) => {
                setQuery((prev) => ({
                  query: c
                    ? {
                        ...prev.query,
                        success: true,
                      }
                    : Object.fromEntries(
                        Object.entries(prev.query).filter(
                          (k: any) => k === "success"
                        )
                      ),

                  options: prev.options,
                }));
              }}
              id="successful-only"
            />
            <Label htmlFor="successful-only">Successful only</Label>
          </div>
        </div>

        {/* Misson Cards */}
        {!data.docs ? (
          <span className="mx-auto my-8">Loading...</span>
        ) : (
          <>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 ">
              {data?.docs?.map((doc: any, ind: number) => (
                <DisplayCard
                  key={ind}
                  name={doc.name}
                  date={doc.date_utc}
                  tbd={doc.tbd}
                  rocket={doc.rocket}
                  id={doc.id}
                />
              ))}
            </div>

            <div className="mx-auto flex flex-col items-center gap-4 md:flex-row">
              <div className="flex gap-4 items-center">
                <Button
                  disabled={data.prevPage === null}
                  className="cursor-pointer"
                  variant={"secondary"}
                  onClick={() => {
                    setQuery((prev) => ({
                      query: prev.query,
                      options: {
                        ...prev.options,
                        page: data.prevPage,
                      },
                    }));
                  }}
                >
                  Prev
                </Button>
                <span>
                  Page {data?.page} of {data?.totalPages}
                </span>
                <Button
                  disabled={data.nextPage === null}
                  className="cursor-pointer"
                  variant={"secondary"}
                  onClick={() => {
                    setQuery((prev) => ({
                      query: prev.query,
                      options: {
                        ...prev.options,
                        page: data.nextPage,
                      },
                    }));
                  }}
                >
                  Next
                </Button>
              </div>
              <div className="flex gap-4 items-center">
                <span>Jump to </span>
                <Input
                  type="number"
                  placeholder="e.g. 4"
                  className="w-24"
                  onChange={(e) => {
                    if (!e.target.value) return;
                    setQuery((prev) => ({
                      query: prev.query,
                      options: {
                        ...prev.options,
                        page: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
