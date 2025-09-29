import { Skeleton } from "@/components/ui/skeleton";
export default function DisplayCardSkeleton() {
  return (
    <div className="w-full p-4 max-w-lg h-56 bg-card">
      <div className="flex justify-between">
        <div className="flex-flex-col  h-1/2">
          <Skeleton className="w-32 h-6 rounded-2xl bg-muted" />
          <Skeleton className="w-64 h-8 my-4 rounded-2xl bg-muted" />
        </div>
        <Skeleton className="h-8 w-32 rounded-2xl bg-accent"></Skeleton>
      </div>

      <Skeleton className="h-8 w-16 rounded-2xl bg-accent my-2"/>
      <Skeleton className="h-6 w-32 rounded-2xl bg-accent mt-10"/>

    </div>
  );
}
