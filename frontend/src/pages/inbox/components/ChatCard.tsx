import React, { useContext } from "react";
import { Label, SubHeading } from "../../../global/Text";
import { COLORS } from "../../../global/Colors";
import { Chat } from "../../../types";
import { useAuthContext } from "../../../global/AuthContext";

function ChatCard({ chat, ...props }: { chat: Chat; [x: string]: any }) {
  // whoever is the destination user
  // for now just use user2

  const context = useAuthContext()
  const user = context?.user

  if(!user){
    return null
  }

  let dest = chat.other_party.username;

  return (
    <div
      className="w-3/5 bg-white rounded-xl p-8 mt-4 flex flex-row items-center"
      {...props}
    >
      <img src={chat.other_party.profile_picture_url} className="w-12 h-12 rounded-full border mr-4" />

      <div className="">
        <SubHeading text={dest} color={COLORS.black} />
        <Label
          text={parseInt(chat.listing.poster.id) == user.id ? "Desired" : "Offering"}
          color={parseInt(chat.listing.poster.id) == user.id ? COLORS.accent : COLORS.accent2}
        />
      </div>
    </div>
  );
}

export default ChatCard;
