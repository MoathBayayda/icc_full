import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import {
  useDeleteSingleNewMutation,
  useGetSingleNewQuery,
  usePutSingleNewMutation,
} from "../Store/Store";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";
import birthDateValidator from "../hooks/validators/birthDateValidator";
import notEmptyValidator from "../hooks/validators/notEmptyValidator";
import loading from "../loading.gif";
import PopUp from "../components/PopUp";
import { changePath } from "../Store/Store";
function SingleNews() {
  const newsId = useSelector((state) => state.config.renderedNewId);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedNewsDate, setEditedNewsDate] = useState("");
  const [editedImageUrls, setEditedImageUrls] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const [putSingleNew, putSingleNewResult] = usePutSingleNewMutation();
  const response = useGetSingleNewQuery(newsId);
  const [deleteSingleNew, deleteSingleNewResult] = useDeleteSingleNewMutation();
  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };
  function handleDeleteNews() {
    deleteSingleNew(newsId);
  }
  const closePopup = () => {
    setIsSuccess(false);
    dispatch(changePath("/news/id"));
  };

  const handleImageUrlChange = (index, url) => {
    const newImageUrls = [...editedImageUrls];
    newImageUrls[index] = url;
    setEditedImageUrls(newImageUrls);
  };

  const handleImageUrlDelete = (index) => {
    const newImageUrls = [...editedImageUrls];
    newImageUrls.splice(index, 1);
    setEditedImageUrls(newImageUrls);
    if (newImageUrls.length === 0)
      setError("1 image at least must be included ");
    else setError();
  };

  const handleAddImageUrl = () => {
    setEditedImageUrls([...editedImageUrls, ""]);
    setError();
  };

  const handleSave = async () => {
    const validation =
      notEmptyValidator(editedTitle) ||
      notEmptyValidator(editedDescription) ||
      notEmptyValidator(editedContent) ||
      birthDateValidator(editedNewsDate);
    if (validation.length !== 0) {
      setError(validation);
      return;
    } else {
      if (editedImageUrls.length === 0) {
        setError("must at least include 1 image url");
        return;
      } else {
        const urlValidation = editedImageUrls.filter(
          (url) => notEmptyValidator(url).length !== 0
        );
        if (urlValidation.length !== 0) {
          setError("url must be added empty image url is not allowed");
          return;
        } else setError();
      }
    }
    putSingleNew({
      news_id: newsId,
      title: editedTitle,
      description: editedDescription,
      content: editedContent,
      news_date: editedNewsDate,
      src: editedImageUrls,
    });
    setIsLoading(true);
  };

  useEffect(() => {
    console.log(deleteSingleNewResult);
    if (
      !deleteSingleNewResult.isUninitialized &&
      !deleteSingleNewResult.isLoading
    ) {
      if (deleteSingleNewResult.isError) {
        setMessage("error deleting news");
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          window.location.reload();
        }, 1000);
        setMessage("successfully deleted");
      }
      handleAction();
      setIsLoading(false);
      setEditMode(false);
    }
  }, [deleteSingleNewResult]);

  useEffect(() => {
    if (response.data) {
      const { title, description, content, news_date, src } = response.data;
      setEditedTitle(title);
      setEditedDescription(description);
      setEditedContent(content);
      setEditedNewsDate(news_date);
      setEditedImageUrls([...src]);
    }
  }, [response.data]);

  useEffect(() => {
    if (!putSingleNewResult.isUninitialized && !putSingleNewResult.isLoading) {
      if (putSingleNewResult.error) {
        console.log(putSingleNewResult)
        setMessage(putSingleNewResult.error.data.ERROR);
      } else {
        setMessage("successfully updated");
      }
      handleAction();
      setIsLoading(false);
      setEditMode(false);
      response.refetch(newsId);
    }
  }, [putSingleNewResult]);

  return (
    <div>
      <div>
        {isSuccess && (
          <PopUp
            message={message}
            onClose={closePopup}
            path="/news/id"
            reload={false}
          />
        )}
        <div className="flex flex-col items-center py-5">
          <button
            className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
      px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200"
            onClick={handleDeleteNews}
          >
            <div className="flex items-center gap-2">
              <div>
                <AiFillDelete />
              </div>
              <div className="mr-2"> Delete news</div>
            </div>
          </button>
          {editMode ? (
            <div>
              <button
                onClick={handleSave}
                className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
      px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <h1 className="mx-2">Loading</h1>
                    <img
                      src={loading}
                      className="w-5 h-5 rounded-md"
                      alt="Loading..."
                    />
                  </div>
                ) : (
                  "Save"
                )}
              </button>{" "}
              <button
                className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
      px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200"
                onClick={() => setEditMode(false)}
              >
                <div className="flex items-center">
                  <div className="mr-2"> Cancel</div>
                  <div>
                    <MdOutlineCancel />
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
        px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex 
        justify-start "
            >
              <div className="flex items-center gap-2">
                <div>
                  <AiFillEdit />
                </div>
                <div className="mr-2">Edit</div>
              </div>
            </button>
          )}

          {response.data && (
            <div
              className={`news bg-gray-800 p-4 rounded-md shadow-md ${
                editMode ? "w-full max-w-4xl mx-auto" : "max-w-2xl"
              }`}
            >
              <h2 className="text-xl font-bold mb-2 text-center text-green-200">
                {editMode ? (
                  <input
                    type="text"
                    value={editedTitle}
                    placeholder="Title"
                    onChange={(e) => {
                      setEditedTitle(e.target.value);
                      const validation = notEmptyValidator(e.target.value);
                      if (validation.length !== 0) setError(validation);
                      else setError();
                    }}
                    className="bg-gray-800 text-green-200 w-full py-2 px-4 border-b border-green-200 outline-none focus:border-green-200"
                  />
                ) : (
                  response.data.title
                )}
              </h2>
              <p className="text-sm text-green-200 mb-4 text-center">
                {editMode ? (
                  <textarea
                    placeholder="description"
                    value={editedDescription}
                    onChange={(e) => {
                      setEditedDescription(e.target.value);
                      const validation = notEmptyValidator(e.target.value);
                      if (validation.length !== 0) setError(validation);
                      else setError();
                    }}
                    className="bg-gray-800 text-green-200 w-full py-2 px-4 border-b border-green-200 outline-none focus:border-green-200"
                  />
                ) : (
                  response.data.description
                )}
              </p>
              <p className="text-green-200 mb-4 text-center">
                {editMode ? (
                  <textarea
                    placeholder="content"
                    value={editedContent}
                    onChange={(e) => {
                      setEditedContent(e.target.value);
                      const validation = notEmptyValidator(e.target.value);
                      if (validation.length !== 0) setError(validation);
                      else setError();
                    }}
                    className="bg-gray-800 text-green-200 w-full py-2 px-4 border-b border-green-200 outline-none focus:border-green-200"
                  />
                ) : (
                  response.data.content
                )}
              </p>
              <p className="text-center mb-2 border-b border-green-200 border-2 border-green-200 rounded-md px-2 flex justify-between">
                <strong className="text-green-200 text-center">
                  News Date
                </strong>
                <span className="text-center text-green-200">
                  {editMode ? (
                    <input
                      placeholder="news date"
                      type="text"
                      value={editedNewsDate}
                      onChange={(e) => {
                        setEditedNewsDate(e.target.value);
                        const validation = birthDateValidator(e.target.value);
                        if (validation.length !== 0) setError(validation);
                        else setError();
                      }}
                      className="bg-gray-800 text-green-200 w-full py-2 px-4 border-b border-green-200 outline-none focus:border-green-200"
                    />
                  ) : (
                    response.data.news_date
                  )}
                </span>
              </p>
              <div className="flex justify-center grid">
                {editedImageUrls.map((url, index) => (
                  <div key={index} className="flex items-center mb-4">
                    {editMode ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => {
                            handleImageUrlChange(index, e.target.value);
                            const validation = notEmptyValidator(
                              e.target.value
                            );
                            if (validation.length !== 0) {
                              setError(validation);
                              return;
                            } else setError();
                            if (editedImageUrls.length === 0)
                              setError("must at least include 1 image url");
                            else setError();
                          }}
                          className="bg-gray-800 text-green-200 w-full py-2 px-4 border-b border-green-200 outline-none focus:border-green-200 mr-2"
                        />
                        <button
                          onClick={() => handleImageUrlDelete(index)}
                          className="text-red-500"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <img
                        src={url}
                        alt={`Material ${index + 1}`}
                        className="mr-4 mb-4 object-contain border-b border-2 border-green-200"
                      />
                    )}
                  </div>
                ))}
              </div>
              {editMode && (
                <button
                  onClick={handleAddImageUrl}
                  className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
            px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex 
            justify-start "
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <IoAddCircleSharp />
                    </div>
                    <div className="mr-2"> Add Image Link</div>
                  </div>
                </button>
              )}
              {editMode && <div className="text-red-400">{error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleNews;
