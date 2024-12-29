import QueryBuilder from '../../builder/querybuilder'
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload)

  //   data.color = "red"

  const result = await data.save()
  return result
}

const getTours = async (query: Record<string, unknown>) /** 17;52 */ => {
  // const queryObj = { ...query }

  // const excludingImportant = [
  //   'searchTerm',
  //   'page',
  //   'limit',
  //   'sortBy',
  //   'sortOrder',
  //   'fields',
  // ]

  // excludingImportant.forEach((key) => delete queryObj[key])

  // const searchTerm = query?.searchTerm || ''

  /* 
  const result = await Tour.find({
    //   $or: [
      //     { name: { $regex: searchTerm, $options: 'i' } },
      //     { startLocation: { $regex: searchTerm, $option: 'i' } },
      //     { locations: { $regex: searchTerm, $option: 'i' } },
      //   ],
      // })

      */

  /* const searchableFields = ['name', 'startLocation', 'locations']
  const result = await Tour.find({
    $or: searchableFields.map((feild) => ({
      [feild]: { $regex: searchTerm, $options: 'i' },
    })),
  }) 17:9 csms3 day-3 p-2
*/

  // const searchableFields = ['name', 'startLocation', 'locations']

  /*
  const searchableFields = ['name', 'startLocation', 'locations']
  const searchQuery = Tour.find({
    $or: searchableFields.map((feild) => ({
      [feild]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  const result = await searchQuery.find(queryObj)*/

  // const searchQuery = Tour.find({
  //   $or: searchableFields.map((feild) => ({
  //     [feild]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // const filterQuery = searchQuery.find(queryObj)

  // const page = Number(query?.page) || 1
  // const limit = Number(query?.limit) || 10
  // const skip = (page - 1) * limit

  // // const result = await filterQuery.skip(skip).limit(limit)
  // const paginationQuery = filterQuery.skip(skip).limit(limit)

  // let sortStr

  // if (query?.sortBy && query?.sortOrder) {
  //   const sortBy = query?.sortBy
  //   const sortOrder = query?.sortOrder
  //   sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
  // }

  // // const result = await paginationQuery.sort(sortStr)
  // const sortQuery = paginationQuery.sort(sortStr)

  // let fields = '-v'
  // if (query?.fields) {
  //   fields = (query?.fields as string)?.split(',').join(' ')
  // }

  // const result = await sortQuery.select(fields)
  // return result

  const searchableFields = ['name', 'startLocation', 'locations']
  const tours = new QueryBuilder(Tour.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select()

  const result = await tours.modelQuery
  return result
}

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id)
  return result
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload)
  return result
}

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNextSchedule = async (id: string) => {
  const tour = await Tour.getNextNearestStartDateAndEndData()
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

  return {
    tour,
    // nextSchedule,
  }
}

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
