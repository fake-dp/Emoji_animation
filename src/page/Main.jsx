import styled from "styled-components";
import { useRef, useState } from "react";

const EMOJIS = [
  { emoji: "😊", order: 0 },
  { emoji: "👏", order: 1 },
  { emoji: "👍", order: 2 },
  { emoji: "🔥", order: 3 },
];

const Container = styled.div`
  position: absolute;
  bottom: 24px;
  right: 20px;
  display: flex;
  border-radius: 78px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  background-color: ${({ theme }) => "#000"};
  padding: 0 10px;
  gap: 20px;

  overflow: hidden;
  transition: width 0.3s ease;

  .emoji-button {
    background: transparent;
  }

  .active {
    opacity: 0;
    pointer-events: auto;
    position: absolute;
  }
`;

const Main = ({ onClick }) => {
  const [activeEmoji, setActiveEmoji] = useState({
    status: "idle",
  });
  const emojiSelected = useRef(null);

  const handleClickEmojiButton = (emojiGroup) => {
    if (
      activeEmoji.status === "collapsing" ||
      activeEmoji.status === "expanding"
    )
      return;

    if (activeEmoji.status === "idle") {
      setActiveEmoji({ status: "collapsing" });
      emojiSelected.current = emojiGroup.order;
      setTimeout(() => setActiveEmoji({ status: "collapsed" }), 300);
    }

    if (activeEmoji.status === "collapsed") {
      setActiveEmoji({ status: "expanding" });
      emojiSelected.current = emojiGroup.order;
      setTimeout(() => setActiveEmoji({ status: "idle" }), 300);
    }
  };

  return (
    <Container
      style={{ width: activeEmoji.status === "idle" ? "180px" : "30px" }}
    >
      {Object.values(EMOJIS).map((emojiGroup, index) => {
        const isExpendingEmojiStatus =
          activeEmoji.status === "idle" || activeEmoji.status === "expanding";
        const isEmojiSelecting =
          emojiSelected.current !== null && emojiSelected.current === index;

        return (
          <button
            key={emojiGroup.order}
            className={`emoji-button ${
              isExpendingEmojiStatus || isEmojiSelecting ? "" : "active"
            }`}
            onClick={() => {
              handleClickEmojiButton(emojiGroup);
              if (onClick) onClick(emojiGroup);
            }}
          >
            {emojiGroup.emoji}
          </button>
        );
      })}
    </Container>
  );
};

export default Main;
