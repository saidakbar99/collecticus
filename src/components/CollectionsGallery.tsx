import { cn } from "@/lib/utils"

import { Collections } from "@/services/CollectionService"

interface CollectionsGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  collection: Collections
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function CollectionsGallery({
  collection,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: CollectionsGalleryProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <img
          src='https://placehold.co/600x400'
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{collection?.title}</h3>
        <p className="text-xs text-muted-foreground">{collection?.user.username}</p>
      </div>
    </div>
  )
}