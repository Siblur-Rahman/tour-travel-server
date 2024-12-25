import { StatusCodes } from 'http-status-codes'
import catchAsync from '../utils/catchAsync'
import sendResponse from '../utils/sendResponse'
import { bookingService } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const body = req.body

  const result = await bookingService.createBooking(body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User created successfully',
    data: result,
  })
})

export const bookingController = {
  createBooking,
}
