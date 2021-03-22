const setPostStatus = setPostStatusVar => status => {
  if(status !== "public" || status !== "private"){
    return ;
  }
  return setPostStatusVar(status);
}

export default setPostStatus