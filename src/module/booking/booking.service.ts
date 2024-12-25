import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import Booking from './booking.model'

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const { user, tour, bookedSlots } = payload

  const requiredTour = await Tour.findById(tour)

  if (!requiredTour) {
    throw new Error('Tour not found')
  }

  const totalPrice = requiredTour.price * bookedSlots

  payload.totalPrice = totalPrice
  payload.bookingStatus = 'pending'

  if (requiredTour.availableSeats < bookedSlots) {
    throw Error('Not enough seats available')
  }

  const booking = await Booking.create(payload)

  const updatedTour = await Tour.findByIdAndUpdate(
    tour,
    {
      $inc: {
        availableSeats: -bookedSlots,
      },
    },
    { new: true }
  )

  if (!updatedTour) {
    throw Error('Failed to update tour')
  }

  // return {} as IBooking // part-4 14:18
  return booking
}

export const bookingService = {
  createBooking,
}
//
