import { forwardRef, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Card } from "./components/Card";
import { FixedSizeList, VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import InfiniteLoaderExample from "./components/InfiniteLoaderExample";
const PADDING_SIZE = 60;
const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      height: `${parseFloat(style.height) + PADDING_SIZE * 2}px`,
    }}
    {...rest}
  />
));
function App() {
  const [count, setCount] = useState(0);

  const fakeArray = Array.from({ length: 3000 });
  const listRef = useRef(null);

  const [items, setItems] = useState([]);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const loadNextPage = (...args) => {
    console.log("args: ", args);
    setIsNextPageLoading(true);

    // fake api trigger
    setTimeout(() => {
      setHasNextPage(items.length < 100);
      setIsNextPageLoading(false);
      setItems((prev) =>
        [...prev].concat(fakeArray.slice(args[0], args[0] + 10))
      );
    }, 2500);
  };

  return (
    <div className="App flex flex-col min-h-screen">
      {/* common way with large list  */}
      {/* {fakeArray.map((item, index) => (
        <Card key={index} />
      ))} */}

      {/* add some padding on top and bottom of fixed item size list  */}
      <FixedSizeList
        className="mx-auto"
        height={300}
        itemCount={fakeArray.length}
        itemSize={300}
        width={600}
        innerElementType={innerElementType}
      >
        {({ index, style }) => (
          <Card
            style={{
              ...style,
              top: `${parseFloat(style.top) + PADDING_SIZE}px`,
            }}
          />
        )}
      </FixedSizeList>

      <div className="flex flex-col flex-1 max-h-96">
        <div className="h-20">test for</div>
        <div className="flex-auto">
          <AutoSizer>
            {({ height, width }) => {
              const getItemSize = (index: number) => {
                if (index === 0) {
                  return 48;
                }
                return height;
              };
              return (
                <VariableSizeList
                  className="mx-auto"
                  height={height}
                  itemCount={3}
                  itemSize={getItemSize}
                  width={width}
                >
                  {({ index, style }) => {
                    console.log(height);
                    if (index === 0) {
                      return (
                        <div style={style}>first Item with custom size</div>
                      );
                    }
                    return <Card style={style} />;
                  }}
                </VariableSizeList>
              );
            }}
          </AutoSizer>
        </div>
      </div>

      <div>
        <InfiniteLoaderExample
          ref={listRef}
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={items}
          loadNextPage={loadNextPage}
        />
      </div>
      <button
        onClick={() => {
          setItems([]);
        }}
      >
        reset
      </button>
    </div>
  );
}

export default App;
