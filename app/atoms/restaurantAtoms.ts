import { atom } from 'jotai'
import { Restaurant } from '../types/Restaurant'

export const restaurantListAtom = atom([] as Restaurant[])
