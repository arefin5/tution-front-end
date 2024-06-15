import React from "react";

const AvatarGroup = ({ userData }) => {
  const renderAvatars = () => {
    if (!userData || !userData?.followersArray) return null;

    const { followersArray } = userData;
    const maxAvatars = 3;

    return followersArray.slice(0, maxAvatars).map((item, index) => (
      <div key={index + 1} className="avatar">
        <div className="w-12 cursor-pointer">
          <img
            src={
              item?.avatarImg
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item?.avatarImg}`
                : "/boy.svg"
            }
            alt="Follower image"
            className="rounded-full w-10 h-10 mr-2"
          />
        </div>
      </div>
    ));
  };

  const renderPlaceholder = () => {
    if (!userData || !userData.followersArray) return null;

    const { followersArray } = userData;
    const maxAvatars = 3;

    if (followersArray.length > maxAvatars) {
      const extraCount = followersArray.length - maxAvatars;
      return (
        <div className="avatar placeholder">
          <div className="w-10 bg-neutral text-neutral-content">
            <span>+{extraCount}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="avatar-group -space-x-6 rtl:space-x-reverse flex ">
      {renderAvatars()}
      {renderPlaceholder()}
    </div>
  );
};

export default AvatarGroup;
