import { useState, useEffect } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  useGetAllNewsQuery,
  fetchAllNews,
  changePath,
  changeRenderedNew,
} from "../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import ImageView from "../components/ImageView";
import Error from "./Error";

function Home() {
  const [renderedContent, setRenderedContent] = useState("home");
  const [pageNumber, setPageNumber] = useState(1);
  const news = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const response = useGetAllNewsQuery({
    minId: pageNumber,
    maxId: pageNumber + 1000,
  });

  function handleAddNews(event) {
    dispatch(changePath("/news/create"));
  }
  useEffect(() => {
    if (!response.isLoading && !response.isUninitialized) {
      if (response.error) {
        setRenderedContent(<Error errorCode={response.error.status}></Error>);
      } else {
        dispatch(fetchAllNews(response.data));
      }
    }
  }, [response]);

  useEffect(() => {
    if (news.length !== 0) {
      const content = news.map((one_new) => {
        return (
          <div
            key={one_new.news_id}
            onClick={() => {
              dispatch(changePath("/news/id"));
              dispatch(changeRenderedNew(one_new.news_id));
            }}
            className="flex h-64 flex justify-between items-center border-b py-4 cursor-pointer hover:bg-gray-100 hover:bg-gray-800 hover:text-green-200"
          >
            <div className="flex items-center px-6 justify-between">
              <div className="ml-4">
                <h3 className="font-bold text-lg">{one_new.title}</h3>
                <p className="text-gray-600">{one_new.description}</p>
              </div>
            </div>
            <div>
              <img
                className="w-64 h-64 object-cover rounded ml-auto py-2 px-2 mx-6"
                src={one_new.src[0]}
                alt={one_new.title}
              />
            </div>
          </div>
        );
      });

      setRenderedContent(
        <div>
          <div>
            <ImageView></ImageView>
          </div>
          <div className="flex flex justify-between space-x-4 justify-start grid grid-cols-2">
            <div>
              <h4 className="font-bold text-lg px-5">News</h4>
              <div className="grid grid-cols-1 gap-4 flex items-center">
                {content}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg px-5">Videos</h4>
              <div className="grid grid-cols-1 gap-4 px-2">
                <div>
                  <iframe
                    width="100%"
                    maxWidth="600" // Set the maxWidth property
                    height="266"
                    src="https://www.youtube.com/embed/XlvEymU-S4o"
                    title="Islamic Culture"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <iframe
                    width="100%"
                    maxWidth="600" // Set the maxWidth property
                    height="266"
                    src="https://www.youtube.com/embed/vcTo57oyO-4"
                    title="Cogito"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <iframe
                    width="100%"
                    maxWidth="600" // Set the maxWidth property
                    height="266"
                    src="https://www.youtube.com/embed/XlvEymU-S4o"
                    title="Yaqeen Institute"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      setRenderedContent(
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">No news to be shown</p>
        </div>
      );
    }
  }, [news]);

  return (
    <div>
      <div>
        <button
          className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
        px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex 
        justify-start "
          onClick={handleAddNews}
        >
          <div className="flex items-center gap-2">
            <div>
              <IoAddCircleSharp />
            </div>
            <div className="mr-2"> Add news</div>
          </div>
        </button>
      </div>
      <div>{renderedContent}</div>
    </div>
  );
}

export default Home;
