import { useState } from "react";
import { BsSend, BsImage, BsXCircle } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null); // State for image preview
  const [fileInputValue, setFileInputValue] = useState(""); // State to reset file input
  const { loading, sendMessage } = useSendMessage();

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
