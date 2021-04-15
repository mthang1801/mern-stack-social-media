import { useEffect, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar, postsVar } from "../cache";
import postActionTypes from "./post.types";
import setPosts from "../operations/mutations/cache/post/setPosts";


