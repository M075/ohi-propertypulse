import logo from "@/public/logo.png";

const Loading = () => {
  return (
    <div data-oid="ac0yemk">
      <CutoutTextLoader
        height="780px"
        background="white"
        darkBackground="black"
        // NOTE: Using GIFs for the background looks super cool :)
        imgUrl="https://images.unsplash.com/photo-1459535653751-d571815e906b?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-oid="r-1pgwo"
      />
    </div>
  );
};

const CutoutTextLoader = ({ height, background, darkBackground, imgUrl }) => {
  return (
    <div className="relative" style={{ height }} data-oid="nqa3ocg">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        data-oid="7_pcuf6"
      />

      <div
        className={`absolute inset-0 animate-pulse z-10 bg-${background} dark:bg-${darkBackground}`}
        data-oid="s8j2bou"
      />

      <span
        className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: height,
        }}
        data-oid="ja2vlrz"
      >
        Loading...
      </span>
    </div>
  );
};

export default Loading;
