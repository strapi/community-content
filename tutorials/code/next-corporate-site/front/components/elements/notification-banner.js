import Markdown from "react-markdown";
import classNames from "classnames";

const NotificationBanner = ({ data: { text, type }, closeSelf }) => {
  return (
    <div
      className={classNames({
        // Common classes
        "flex flex-row justify-between items-center text-white px-2 py-2": true,
        "bg-blue-600": type === "info",
        "bg-orange-600": type === "warning",
        "bg-red-600": type === "alert",
      })}
    >
      <div className="rich-text">
        <Markdown source={text} />
      </div>
      <button onClick={closeSelf} className="px-1 py-1">
        <img
          src="/icons/cross-white.svg"
          alt="Close"
          className="h-4 w-auto ml-4 flex-shrink-0"
        />
      </button>
    </div>
  );
};

export default NotificationBanner;
