import {userResolvers} from "../user/user.resolvers"
import {postResolvers} from "../post/post.resolvers"
import {commentResolvers} from "../comment/comment.resolvers"
import {contactResolvers} from "../contact/contact.resolvers"
import {privateChatResolvers} from "../chat/private-chat/private-chat.resolvers"
const resolvers = [userResolvers, postResolvers, commentResolvers, contactResolvers, privateChatResolvers]

export default resolvers