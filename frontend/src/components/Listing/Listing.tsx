import React from "react";
import { Label, RegText, SubHeading } from "../../global/Text";
import { COLORS } from "../../global/Colors";
import { Listing as ListingType } from "../../types";
import { IconButton } from "../../global/Buttons";
import { useChats, usePostChat } from "../../pages/inbox/useChats";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "react-query";

function getCookie(name: string): string | null {
  // Split document.cookie on semicolons into an array of all the cookies
  const cookieArray = document.cookie.split(";");

  // Iterate through the array elements
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    // Strip leading whitespace from the cookie, necessary for matching names
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    // If this cookie's name matches the requested name, return its value
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  // Return null if the cookie with given name is not found
  return null;
}

interface ListingProps {
  listing: ListingType;
}

function formatTimeAgo(created_at: string): string {
  const timestampString = created_at;
  const timestampParts = timestampString.split(" ");
  const dateString = timestampParts[0];
  const timeString = timestampParts[1];

  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months in JavaScript are zero-based
  const day = parseInt(dateParts[2]);

  const timeParts = timeString.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);
  const second = parseFloat(timeParts[2]);

  const milliseconds = second * 1000;

  const date = new Date(
    Date.UTC(year, month, day, hour, minute, 0, milliseconds),
  );

  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
  const diffInMinutes = Math.round(diffInSeconds / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}d`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  } else {
    return `${Math.round(diffInSeconds)}s`;
  }
}

const Listing: React.FC<ListingProps> = ({ listing }) => {
  const timeAgo = formatTimeAgo(listing.created_at);

  // const context = useAuthContext();
  const { data, isError, isLoading } = useChats();
  const { mutateAsync: postChat } = usePostChat();

  // if (!context || isError || isLoading) {
  //   return null;
  // }
  // if (!context) {
  //   return null;
  // }

  return (
    <div
      className="listing-card"
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        padding: "20px",
        borderRadius: "20px",
        margin: "3px auto",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        backgroundColor: COLORS.text,
        color: "#FFF",
        position: "relative",
      }}>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          fontSize: "0.8em",
          justifyContent: "flex-start",
        }}>
        <SubHeading
          text={`@${listing.poster.username}`}
          color={COLORS.primary}
        />
        <span style={{ margin: "0 5px", color: COLORS.accent }}>&middot;</span>
        <div
          style={{
            backgroundColor: COLORS.red,
            borderRadius: "20px",
            padding: "2px 6px",
            color: "white",
            display: "inline-block",
          }}>
          <Label text={`- ${listing.have_class.class_name}`} color="#FFF" />
        </div>
        <span style={{ margin: "0 5px", color: COLORS.accent }}>&middot;</span>
        <div
          style={{
            backgroundColor: COLORS.green,
            borderRadius: "20px",
            padding: "2px 6px",
            color: "white",
            display: "inline-block",
          }}>
          <Label text={`+ ${listing.want.class_id}`} color="#ffffff" />
        </div>
        <span style={{ margin: "0 5px", color: COLORS.accent }}>&middot;</span>
        <RegText text={timeAgo} color="#657786" />
      </div>
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <RegText text={listing.description} color={COLORS.black} />
      </div>
      <div className="flex flex-row justify-between">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}>
          {/* {tags.map((tag) => (
            <div
              key={tag}
              style={{
                backgroundColor: COLORS.accent,
                borderRadius: "20px",
                padding: "2px 10px",
                color: "black",
              }}
            >
              <Label text={`#${tag}`} color={COLORS.text} />
            </div>
          ))} */}
        </div>

        <IconButton
          color={COLORS.black}
          onClick={async () => {
            // const user = context.user;
            const token = getCookie("token");
            if (!token) return;
            const userId = jwtDecode(token).sub;
            if (!userId) return;
            if (data) {
              console.log(data);
              const filtered = data.filter(
                // @ts-ignore
                element => element.other_user.id === userId,
              );

              console.log(filtered);

              if (filtered.length === 0) {
                console.log("Unknown, add new chat");
                await postChat(listing.id);
                console.log("posted chat");
              } else {
                console.log("Chat already exists");
              }
            }
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
};

export default Listing;
