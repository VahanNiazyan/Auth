import { createStore } from 'vuex'
import customer from '@/store/modules/customer'
import login from '@/store/modules/auth/login'
import registration from '@/store/modules/auth/registration'
import forgotPassword from '@/store/modules/auth/forgot-password'
import tickets from '@/store/modules/support/tickets'
import ticket from '@/store/modules/support/tickets/ticket'
import messages from '@/store/modules/support/tickets/messages'
import abuse from '@/store/modules/support/abuse'
import balance from '@/store/modules/payment/balance'
import {
  server,
  disks,
  networks,
  settings,
  snapshots,
  upgrades,
  vnc,
  reinstall
} from '@/store/modules/service/server'
import sshKey from '@/store/modules/service/ssh-key'
import payment from '@/store/modules/payment'
import transaction from '@/store/modules/payment/transaction'
import invoice from '@/store/modules/payment/invoice'
import profile from '@/store/modules/profile'

export default createStore({
  modules: {
    customer,
    login,
    registration,
    forgotPassword,
    tickets,
    ticket,
    messages,
    abuse,
    balance,
    server,
    disks,
    networks,
    settings,
    snapshots,
    upgrades,
    vnc,
    reinstall,
    sshKey,
    payment,
    transaction,
    invoice,
    profile
  },
})
