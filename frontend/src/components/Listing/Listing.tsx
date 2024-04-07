import React from "react";
import { Label, RegText, SubHeading } from "../../global/Text";
import { COLORS } from "../../global/Colors";
import { Listing as ListingType } from "../../types";

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
    Date.UTC(year, month, day, hour, minute, 0, milliseconds)
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
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          fontSize: "0.8em",
          justifyContent: "flex-start",
        }}
      >
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
          }}
        >
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
          }}
        >
          <Label text={`+ ${listing.want.class_id}`} color="#ffffff" />
        </div>
        <span style={{ margin: "0 5px", color: COLORS.accent }}>&middot;</span>
        <RegText text={timeAgo} color="#657786" />
      </div>
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <RegText text={listing.description} color={COLORS.black} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
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
    </div>
  );
};

export default Listing;
