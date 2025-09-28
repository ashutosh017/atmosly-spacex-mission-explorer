import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function DisplayCard({
  id,
  name,
  date,
  tbd,
  rocket,
}: {
  id: string;
  name: string;
  date: string;
  tbd: boolean;
  rocket: string;
}) {
  const arrName = "SpaceX_Favourite_Launches";

  const [favourites, setFavourites] = useState<string[]>([]);
  useEffect(() => {
    const favObj = localStorage.getItem(arrName);
    if (favObj) {
      setFavourites(() => JSON.parse(favObj).fav);
    }
  }, []);
  function handleAddFavToLocalStorage(id: string) {
    const favObj = localStorage.getItem(arrName);
    if (!favObj) {
      localStorage.setItem(arrName, JSON.stringify({ fav: [id] }));
      return;
    }
    let parsedObj = JSON.parse(favObj);
    if (parsedObj.fav.includes(id))
      parsedObj.fav = parsedObj.fav.filter((i: any) => i !== id);
    else parsedObj.fav.push(id);
    setFavourites(parsedObj.fav);
    localStorage.setItem(arrName, JSON.stringify(parsedObj));
  }
  return (
    <div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {new Date(date).toLocaleDateString("en-US", {
              hourCycle: "h23",
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
            , {rocket}
          </CardDescription>
          <CardAction>
            <Button
              variant={"ghost"}
              asChild
              onClick={() => {
                handleAddFavToLocalStorage(id);
              }}
            >
              <div className="border-2 rounded-2xl px-2 py-1  text-xsm flex items-center justify-center gap-2">
                <Star
                  className={cn(
                    "size-3 cursor-pointer",
                    favourites.includes(id) && "fill-white"
                  )}
                />
                <span className="text-xs">Add fav.</span>
              </div>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex gap-4">
          {tbd && (
            <Button variant={"outline"} className="rounded-2xl ">
              TBD
            </Button>
          )}
          <Button
            variant={"secondary"}
            className=" rounded-2xl text-blue-500 hover:text-blue-600 border-2 border-blue-700 hover:border-blue-800"
          >
            {new Date(date).toLocaleDateString("en-US", { year: "numeric" })}
          </Button>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <Button variant={"link"} className="cursor-pointer ml-0 pl-0 ">
            <span className="underline-offset-4 underline hover:text-yellow-100">
              View details
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
