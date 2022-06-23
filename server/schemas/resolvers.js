const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    //return thoughts array by username
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    //find single thought by id
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        //include data from friends an thoughtd schemas
        .populate("friends")
        .populate("thoughts");
    },
  },
};

module.exports = resolvers;
