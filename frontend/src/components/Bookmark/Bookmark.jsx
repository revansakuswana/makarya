import { useState } from "react";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import axios from "axios";

const Bookmark = (props) => {
  // eslint-disable-next-line react/prop-types
  const jobId = props.jobId
  const [isBookmarked, setIsBookmarked] = useState(false);
  console.log(jobId);
  
  const toggleBookmark = async () => {
    setIsBookmarked(!isBookmarked);

    try {
      const response = await axios.post("http://localhost:3000/assign-job", 
        { jobId: jobId  },
        { jobId: 1 }, 
        {
          withCredentials: true,  // This will send cookies (including JWT) with the request
          headers: {
            'Content-Type': 'application/json'
          }
        });
        

      if (!response.ok) {
        throw new Error("Failed to update bookmark status");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsBookmarked(isBookmarked);
    }
  };

  return (
    <div
      className="bookmark"
      onClick={toggleBookmark}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      {isBookmarked ? (
        <BookmarkIconSolid
          style={{
            color: "black",
            width: "30px",
            height: "30px",
          }}
        />
      ) : (
        <BookmarkIconOutline
          style={{
            color: "black",
            width: "30px",
            height: "30px",
          }}
        />
      )}
    </div>
  );
};

export default Bookmark;
