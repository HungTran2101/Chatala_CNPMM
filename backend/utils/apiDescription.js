//comment out completed api

// USER

// const login = {
//   url: "api/user/login",
//   auth: false,
//   method: "POST",
//   req: {
//     phone: String,
//     password: String,
//   },
//   res: {
//     avatar: String,
//     banner: String,
//     name: String,
//   },
// };

// const register = {
//   url: "api/user/register",
//   auth: false,
//   method: "POST",
//   req: {
//     name: String,
//     phone: String,
//     password: String,
//   },
//   res: {
//     message: String,
//   },
// };

const findUser = {
  url: "api/user/find",
  auth: true,
  method: "POST",
  req: {
    nameOrPhone: String,
  },
  res: [
    {
      _id: String,
      avatar: String,
      banner: String,
      name: String,
      phone: String,
      gender: String,
      dob: String,
      isFriend: Boolean,
      createdAt: String,
      updatedAt: String,
    },
  ],
};

const editUserInfo = {
  url: "api/user/update",
  auth: true,
  method: "POST",
  req: {
    name: String,
    gender: String,
    dob: Date,
  },
  res: {
    name: String,
    gender: String,
    dob: Date,
  },
};

const friendRequest = {
  url: "api/user/friend-request/:id",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const friendAccept = {
  url: "api/user/notification/:id/accept",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const friendDecline = {
  url: "api/user/notification/:id/decline",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const block = {
  url: "api/user/block/:id",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const unblock = {
  url: "api/user/unblock/:id",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const setAvatar = {
  url: "api/user/avatar",
  auth: true,
  method: "POST",
  contentType: "multipart/form-data",
  req: {
    avatar: File,
  },
  res: {
    avatarUrl: String,
  },
};

// ROOM

const getRoomList = {
  url: "api/room",
  auth: true,
  method: "GET",
  req: {},
  res: [
    {
      _id: String,
      roomName: String,
      roomAvatar: String,
      lastMsg: String,
    },
  ],
};

const getRoomInfo = {
  url: "api/room/:id",
  auth: true,
  method: "GET",
  req: {},
  res: {
    roomName: String,
    roomAvatar: String,
    isGroup: Boolean,
    users: [
      {
        avatar: String,
        role: Boolean,
        name: String,
      },
    ],
    messages: [
      {
        _id: String,
        senderId: String,
        msg: String,
        files: [
          {
            url: String,
            type: String,
          },
        ],
        unSend: Boolean,
        delete: Boolean,
        createdAt: Date,
        modifiedAt: Date,
      },
    ],
  },
};

const changeRoomName = {
  url: "api/room/:id/change-name",
  auth: true,
  method: "POST",
  req: {
    roomName: String,
  },
  res: {
    message: String,
  },
};

const setNickname = {
  url: "api/room/:id/nickname",
  auth: true,
  method: "POST",
  req: {
    uid: String,
    nickname: String,
  },
  res: {
    message: String,
  },
};

const addMember = {
  url: "api/room/:id/member",
  auth: true,
  method: "POST",
  req: {
    uid: String,
  },
  res: {
    message: String,
  },
};

// MESSAGE

// const sendMessage = {
//   url: "api/message/",
//   auth: true,
//   method: "POST",
//   req: {
//     roomId: String,
//     msg: String,
//     files: [{
//       url: String,
//       name: String,
//       type: String, //file or image
//     }],
//   },
//   res: {
//     message: String,
//   },
// };

// const unSendMessage = {
//   url: "api/message/:msgId/unsend",
//   auth: true,
//   method: "PUT",
//   req: {},
//   res: {
//     message: String,
//   },
// };

// const deletedMessage = {
//   url: "api/message/:msgId/delete",
//   auth: true,
//   method: "DELETE",
//   req: {},
//   res: {
//     message: String,
//   },
// };

// // UTILS

// const signedFileUrl = {
//   url: "api/util/signedFileUrl",
//   auth: true,
//   method: "GET",
//   req: {},
//   res: {
//     signature: String,
//     timestamps: String,
//   },
// }
