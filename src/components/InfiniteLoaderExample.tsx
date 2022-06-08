import React, { useEffect, useRef, forwardRef } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import { Card } from "./Card";
function InfiniteLoaderExample(
  {
    // Are there more items to load?
    // (This information comes from the most recent API request.)
    hasNextPage,

    // Are we currently loading a page of items?
    // (This may be an in-flight flag in your Redux store for example.)
    isNextPageLoading,

    // Array of items loaded so far.
    items,

    // Callback function responsible for loading the next page of items.
    loadNextPage,
  },
  ref
) {
  const hasMountedRef = useRef(false);

  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) => !hasNextPage || index < items.length;
  const Item = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
      return (
        <div className="flex justify-center items-center" style={style}>
          {content}
        </div>
      );
    } else {
      return <Card style={style} />;
    }
  };
  return (
    <InfiniteLoader
      ref={ref}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          className="mx-auto"
          itemCount={itemCount}
          onItemsRendered={onItemsRendered}
          ref={ref}
          itemSize={200}
          width={500}
          height={300}
        >
          {Item}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}

export default forwardRef(InfiniteLoaderExample);
