let status = localStorage.getItem("post-status");
if(status !== "public" || status !== "private"){
  status = "public";
}

const PostStatus = status

export {PostStatus}
