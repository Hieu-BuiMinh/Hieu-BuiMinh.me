import { defineSchema } from 'convex/server'

import guestbookComment from './schemas/guestbook-comment.schema'
import post from './schemas/post.schema'
import users from './schemas/users.schema'

export default defineSchema({ guestbookComment, users, post })
