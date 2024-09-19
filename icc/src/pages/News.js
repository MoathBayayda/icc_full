import { useSelector } from "react-redux";
import { useGetSingleNewQuery } from "../Store/Store";
import { useEffect, useState } from "react";

function News() {
  const newsId = useSelector((state) => state.config.renderedNewId);
  const response = useGetSingleNewQuery(newsId);
  const [renderedContent, setRenderedContent] = useState("");

  useEffect(() => {
    if (!response.isLoading && !response.isUnintilaized) {
      if (response.error) {
        console.log(response);
      } else {
        setRenderedContent(
          <div className="flex flex-col items-center py-5 ">
            <div className="news bg-gray-800 p-4 rounded-md shadow-md max-w-2xl ">
              <h2 className="text-xl font-bold mb-2 text-center text-green-200">
                {response.data.title}
              </h2>
              <p className="text-sm text-green-200 mb-4 text-center">
                {response.data.description}
              </p>
              <p className="text-green-200 mb-4 text-center">
                {response.data.content}
              </p>
              <p className="text-center mb-2 border-b border-green-200 border-2 border-green-200 rounded-md px-2 flex justify-between">
                <strong className="text-black text-center"></strong>
                <span className="text-center text-green-200">
                  {response.data.news_date}
                </span>
              </p>
              <div className="flex justify-center grid">
                {response.data.src.map((url, index) => (
                  <div>
                    <img
                      key={index}
                      src={url}
                      alt={`Material ${index + 1}`}
                      className="mr-4 mb-4 object-contain border-b border-2 border-green-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  }, [response]);

  return <div>{renderedContent}</div>;
}

export default News;
