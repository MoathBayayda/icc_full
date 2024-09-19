import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
function ImageView() {
  const news = useSelector((state) => state.news);
  const [renderedImageIndex, setRenderedImageIndex] = useState(0);

  function handleArrowRight() {
    if (renderedImageIndex + 1 < news.length)
      setRenderedImageIndex(renderedImageIndex + 1);
    else setRenderedImageIndex(0);
  }
  function handleArrowLeft() {
    if (renderedImageIndex - 1 > -1)
      setRenderedImageIndex(renderedImageIndex - 1);
    else setRenderedImageIndex(news.length - 1);
  }
  useEffect(() => {
    setTimeout(() => {
      handleArrowRight();
    }, 1000);
  }, [renderedImageIndex]);
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative w-64 h-48 overflow-hidden ">
        <div className="flex items-center justify-center border-2 rounded-md border-gray-800 bg-gray-800">
          <h className="font-bold border-12 text-green-200">{news[renderedImageIndex].title}</h>
        </div>
        <img
          className="w-full h-full object-cover py-2"
          src={news[renderedImageIndex].src[0]}
          alt={news[renderedImageIndex].title}
        />
        <button
          className="absolute bottom-2 left-2 bg-transparent text-gray-700 px-4 py-2 text-sm cursor-pointer"
          onClick={handleArrowLeft}
        >
          <BsFillArrowLeftCircleFill className="bg-green-200 rounded-md w-12" />
        </button>
        <button
          className="absolute bottom-2 right-2 bg-transparent text-gray-700 px-4 py-2 text-sm cursor-pointer"
          onClick={handleArrowRight}
        >
          <BsFillArrowRightCircleFill className="bg-green-200 rounded-md w-12" />
        </button>
      </div>
    </div>
  );
}
export default ImageView;
