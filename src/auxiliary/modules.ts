import { UsersModule } from '../users/users.module'
import { SubscriptionsModule } from '../subscriptions/subscription.module'
import { AdminsModule } from '../admins/admins.module'
import { AuthModule } from 'src/auth/auth.module'

export const modules = [UsersModule,SubscriptionsModule,AdminsModule,AuthModule]