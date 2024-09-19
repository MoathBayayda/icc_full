import { useEffect, useState } from "react";
import Form from "../components/Form";
import { changePath, usePostSingleNewMutation } from "../Store/Store";
import { useDispatch } from "react-redux";
import PopUp from "../components/PopUp";
import notEmptyValidator from "../hooks/validators/notEmptyValidator";
import birthDateValidator from "../hooks/validators/birthDateValidator";
import useConfigCreateNews from "../hooks/useConfigCreateNews";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
function CreateNews() {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [nDateValue, setNDateValue] = useState("");
  const [isError, setIsError] = useState(true);
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [postSIngleNew, postSingleNewResult] = usePostSingleNewMutation();
  const [message, setMessage] = useState();

  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };
  function closePopup() {
    // window.location.reload();
    setIsSuccess(false);
    dispatch(changePath("/news"));
  }
  function onUrlChange(event, index) {
    const newImageUrlValue = [...imageUrls];
    newImageUrlValue[index] = event.target.value;
    setImageUrls([...newImageUrlValue]);
  }
  function handleAddImage(event) {
    event.preventDefault();
    setImageUrls([...imageUrls, ""]);
  }

  function handleDeleteImage(event, index) {
    const images = [...imageUrls];
    images.splice(index, 1);
    setImageUrls(images);
    if (images.length === 0) {
      setIsError(true);
      setErrors("1 image at least must be included ");
    } else {
      setIsError(false);
      setErrors();
    }
  }

  function titleOnChange(event) {
    setTitleValue(event.target.value);
    const validation = notEmptyValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function descriptionOnChange(event) {
    setDescriptionValue(event.target.value);
    const validation = notEmptyValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function contentOnChange(event) {
    setContentValue(event.target.value);
    const validation = notEmptyValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function nDateOnChange(event) {
    setNDateValue(event.target.value);
    const validation = birthDateValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }
  const config = useConfigCreateNews({
    titleValue,
    descriptionValue,
    contentValue,
    nDateValue,
    titleOnChange,
    descriptionOnChange,
    contentOnChange,
    nDateOnChange,
    isError,
    errors,
  });

  function handleSubmitForm(event) {
    event.preventDefault();
    const validation =
      notEmptyValidator(titleValue) ||
      notEmptyValidator(descriptionValue) ||
      notEmptyValidator(contentValue) ||
      birthDateValidator(nDateValue);
    if (validation.length !== 0) {
      setIsError(true);
      setErrors(validation);
      return;
    } else {
      if (imageUrls.length === 0) {
        setIsError(true);
        setErrors("must at least include 1 image url");
        return;
      } else {
        const urlValidation = imageUrls.filter(
          (url) => notEmptyValidator(url).length !== 0
        );
        if (urlValidation.length !== 0) {
          setIsError(true);
          setErrors("url must be added empty image url is not allowed");
          return;
        } else {
          setErrors();
          setIsError(false);
        }
      }
    }
    const images = imageUrls.map((url) => {
      return {
        src: url,
      };
    });
    postSIngleNew({
      title: titleValue,
      description: descriptionValue,
      content: contentValue,
      date: nDateValue,
      urls: images,
    });
  }

  useEffect(() => {
    console.log(postSingleNewResult);
    if (
      !postSingleNewResult.isUninitialized &&
      !postSingleNewResult.isLoading
    ) {
      if (postSingleNewResult.isError) {
        setMessage("error adding news");
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          window.location.reload();
        }, 1000);
        setMessage("successfully added");
      }
      handleAction();
    }
  }, [postSingleNewResult]);

  return (
    <div>
      <div>
        {isSuccess && (
          <PopUp message={message} onClose={closePopup} path="/news" />
        )}
      </div>
      <Form config={config} onChange={handleSubmitForm} className=" max-w-4xl">
        <div>
          <button
            className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
      px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200"
            onClick={handleAddImage}
          >
            <div className="flex items-center gap-2">
              <div>
                <IoAddCircleSharp />
              </div>
              <div className="mr-2"> Add image</div>
            </div>
          </button>
          <div>
            {imageUrls.map((url, index) => {
              return (
                <div>
                  <textarea
                    value={url}
                    onChange={(event) => {
                      onUrlChange(event, index);
                      const validation = notEmptyValidator(event.target.value);
                      if (validation.length !== 0) {
                        setErrors(validation);
                        setIsError(true);
                        return;
                      } else {
                        setErrors();
                        setIsError(false);
                      }
                      if (imageUrls.length === 0) {
                        setErrors("must at least include 1 image url");
                        setIsError(true);
                      } else {
                        setErrors();
                        setIsError(false);
                      }
                    }}
                    className="h-12 py-1 bg-gray-800 text-center border-md text-green-200 font-bold focus:outline-none
          focus:ring-2  border-2 border-green-200 shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent 
          focus:ring-red-500"
                  ></textarea>
                  <button
                    className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
                            px-4 py-2 my-2 mx-1 text-black bg-gray-700
                            text-white hover:bg-gray-800 hover:text-green-200 mx-2"
                    onClick={(event) => {
                      handleDeleteImage(event, index);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <AiFillDelete />
                      </div>
                      <div className="mr-2">Delete</div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </Form>
    </div>
  );
}
export default CreateNews;
