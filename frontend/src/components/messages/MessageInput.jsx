import { useState, useRef, useEffect } from "react";
import { BsSend, BsImage, BsXCircle, BsEmojiSmile } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const smileys = Array.from({ length: 100 }, (_, i) => String.fromCodePoint(0x1f600 + i % 80));

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null); // State for image preview
  const [fileInputValue, setFileInputValue] = useState(""); // State to reset file input
  const [showSmileys, setShowSmileys] = useState(false); // Show/hide smiley selector
  const { loading, sendMessage } = useSendMessage();
  const smileyRef = useRef(null); // Ref to handle click outside

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (smileyRef.current && !smileyRef.current.contains(event.target)) {
        setShowSmileys(false); // Close smiley selector on outside click
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !fileInputValue) return; // Prevent submission if no data
    await sendMessage(message, fileInputValue);
    setMessage("");
    setPreview(null); // Clear preview after sending
    setFileInputValue(""); // Reset file input
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate preview URL
      setFileInputValue(file); // Store the file
    }
  };

  const removePreview = () => {
    setPreview(null); // Clear the preview
    setFileInputValue(""); // Reset file input
  };

  const handleSmileyClick = (smiley) => {
    setMessage((prev) => prev + smiley);
    setShowSmileys(false); // Hide smiley selector after choosing
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      {preview && (
        <div className="image-preview mb-3 flex items-center gap-3">
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 object-cover rounded-lg ml-3"
          />
          <button
            type="button"
            onClick={removePreview}
            className="text-gray-400 hover:text-white">
            <BsXCircle size={24} />
          </button>
        </div>
      )}
      <div className="w-full relative flex items-center">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* Smiley Selector */}
        <button
          type="button"
          onClick={() => setShowSmileys((prev) => !prev)}
          className="absolute inset-y-0 end-20 flex items-center pe-3 text-gray-400 hover:text-white">
          <BsEmojiSmile size={20} />
        </button>
        {showSmileys && (
          <div
            ref={smileyRef}
            className="absolute bottom-full right-0 bg-gray-700 p-2 rounded-lg shadow-lg grid grid-cols-10 gap-1">
            {smileys.map((smiley, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSmileyClick(smiley)}
                className="text-xl hover:bg-gray-600 rounded-lg p-1">
                {smiley}
              </button>
            ))}
          </div>
        )}
        {/* Upload Icon */}
        <label
          htmlFor="image-upload"
          className="absolute inset-y-0 end-12 flex items-center pe-3 cursor-pointer text-gray-400 hover:text-white">
          <BsImage size={20} />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        {/* Send Button */}
        <button
          type="submit"
          disabled={!message && !fileInputValue} // Enable if either is present
          className={`absolute inset-y-0 end-0 flex items-center pe-3 ${
            !message && !fileInputValue
              ? "text-gray-500 cursor-not-allowed"
              : "text-white"
          }`}>
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
