import { useState } from "react";
import { useSelector } from "react-redux";

function Certificates() {
  const student = useSelector((state) => state.student);
  const [selectedCertificate, setSelectedCertificate] = useState(0);

  const handleDropdownClick = (index) => {
    setSelectedCertificate((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {student.certificates !== null  &&
      student.certificates.length !== 0 ? (
        <div className="grid grid-cols-2 gap-2 gap-y-1 h-screen py-8 px-8">
          {student.certificates.map((certificate, index) => (
            <div key={index} className="mb-2">
              <button
                className={`w-full font-bold py-2 px-4 rounded ${
                  selectedCertificate === index
                    ? "bg-gray-700 text-green-200 hover:bg-gray-800"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
                onClick={() => handleDropdownClick(index)}
              >
                Certificate {index + 1}
              </button>
              {selectedCertificate === index && (
                <div className="mt-2">
                  <embed
                    src={certificate}
                    type="application/pdf"
                    width="100%"
                    height="500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">No certificates earned to be shown</p>
        </div>
      )}
    </div>
  );
}

export default Certificates;
