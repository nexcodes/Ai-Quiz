import { User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
type Props = {
  user: Pick<User, "name" | "image">;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            src={user.image}
            alt="Profile"
            fill
            className="rounded-full"
            referrerPolicy="no-referrer"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
