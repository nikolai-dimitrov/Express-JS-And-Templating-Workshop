exports.checkPermission = (owner, user,res) => {
  if (owner != user?._id) {
    return res.redirect("/404");
  }
};
