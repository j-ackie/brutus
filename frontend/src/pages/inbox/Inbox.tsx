import React, { useState } from "react";
import { COLORS } from "../../global/Colors";
import ChatCard from "./components/ChatCard";
import ChatDisplay from "./components/ChatDisplay";
import { RegText } from "../../global/Text";
import { useChats } from "./useChats";
import Loading from "../../global/Loading";

function Inbox() {
  const { data, isLoading, isError } = useChats();
  const [selected, setSelected] = useState(-1);

  console.log(data);
  if (isLoading) return <Loading />;

  if (isError || !data) return null;

  const chats = data;

  console.log(chats);

  return (
    <div
      className="h-screen flex flex-row pb-20"
      style={{
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`,
      }}>
      <div className="h-full flex flex-col items-center overflow-y-scroll flex-1">
        {chats.map((element, i) => {
          return (
            <ChatCard
              chat={element}
              onClick={() => {
                setSelected(i);
              }}
            />
          );
        })}
      </div>

      <div className="flex-1">
        {selected === -1 ? (
          <RegText text="Select a chat..." />
        ) : (
          <ChatDisplay id={chats[selected].id} />
        )}
      </div>
    </div>
  );
}

export default Inbox;
