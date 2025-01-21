/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { cardModel } from '~/models/cardModel'

const createNew = async reqBody => {
  try {
    const newCard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
