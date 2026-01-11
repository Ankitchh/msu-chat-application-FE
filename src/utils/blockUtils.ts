import type { SingleChatRoom } from "../contexts/roomContext";

// utils/blockUtils.ts
export const getBlockStatus = (
  room: SingleChatRoom,
  currentUserId: string
): {
  isBlocked: boolean;
  isBlockedByOther: boolean;
  blockedBy: "self" | "other" | null;
  otherUserId: string;
} => {
  const otherUserId =
    room.senderId === currentUserId ? room.receiverId : room.senderId;

  if (!room.blocked) {
    return {
      isBlocked: false,
      isBlockedByOther: false,
      blockedBy: null,
      otherUserId,
    };
  }

  // If current user blocked someone
  if (room.blocked === otherUserId) {
    return {
      isBlocked: true,
      isBlockedByOther: false,
      blockedBy: "self",
      otherUserId,
    };
  }

  // If current user was blocked by someone
  if (room.blocked === currentUserId) {
    return {
      isBlocked: false,
      isBlockedByOther: true,
      blockedBy: "other",
      otherUserId,
    };
  }

  // Default
  return {
    isBlocked: false,
    isBlockedByOther: false,
    blockedBy: null,
    otherUserId,
  };
};
