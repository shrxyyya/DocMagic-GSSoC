import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-4 p-4 border rounded-lg">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
            <div className="pt-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-3 w-48 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
