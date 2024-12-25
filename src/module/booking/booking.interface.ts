import mongoose from 'mongoose'

export interface IBooking {
  user: mongoose.Schema.Types.ObjectId // 2:08
  tour: mongoose.Schema.Types.ObjectId
  bookedSlots: number
  bookingStatus: 'pending' | 'paid' | 'cancelled'
  totalPrice: number
}
