import { defineSchema } from 'convex/server'

import guestbookCommentSchema from './schemas/guestbook-comment/guestbook-comment.schema'
import { users } from './schemas/users/users.schema'

export default defineSchema({ guestbookCommentSchema, users })
