import { b2DownloadFileById } from "@actions/b2";
import LoadingSpinner from "@app/common/LoadingSpinner";
import { base64ToBlob, downloadBlob } from "@utils/helpers";
import { useState } from "react";
import { toast } from "react-toastify";

function DownloadPhoto({ photo }) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    try {
      let res = await b2DownloadFileById(photo.pid);
      if (!res.ok) {
        throw new Error("Unable to download photo");
      }

      const data = res.data;
      const { content, mimeType } = data;
      const blob = await base64ToBlob({ content, mimeType });
      downloadBlob({ blob, fileName: photo.name });
    } catch (err) {
      toast.error("Unable to download photo", {
        toastId: "Error: Download photo",
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="p-2 flex flex-row gap-2 opacity-50 hover:opacity-100">
      <div className="bg-black rounded flex flex-row items-center gap-2 p-1">
        <button
          className="aspect-square w-4 opacity-80 disabled:opacity-50"
          onClick={handleDownload}
          disabled={isDownloading}>
          <img src="/assets/icons/download.svg" />
        </button>
        {isDownloading && (
          <div className="w-4 text-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
export default DownloadPhoto;
