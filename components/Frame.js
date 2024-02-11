'use client'

import SpacePlayer from './SpacePlayer';
import Interact from "./Interact";
import { Suspense,  useEffect,  useState } from 'react';
import { useQueryState } from 'nuqs';
import { useSearchParams } from 'next/navigation';

export default function Frame( { spaces, categories, creators } ) {
  const categorySpaces = (categoryName) => {
    const array = []
    for (let i = 0; i < spaces.length; i++) {
      if(spaces[i].categoryName === categoryName) {
        array.push(spaces[i])
      }
    }

    return array
  }

  const getIdInCurrentCategory = (categoryName, spaceId) => {
    const category = categorySpaces(categoryName)
    for (let i = 0; i < category.length; i++) {
      if (category[i].id === spaceId) {
        return i
      } 
    }
  }

  const fetchSpaceDetails = (categoryName = "Mystery", spaceId = 0) => {
    const space = categorySpaces(categoryName)[spaceId]
    let creator;
    for (let i = 0; i < creators.length; i++) {
      if(creators[i].id === space.authorId) {
        creator = creators[i]
      }
    }

    return {
      space: space,
      creator: creator,
    }
  }

  const searchSpaces = (spaceId) => {
    for (let i = 0; i < spaces.length; i++) {
      if (spaceId === spaces[i].id) {
        return spaces[i]
      }
    }
    return false 
  }

  const validateSpaceId = (spaceId) => {
    if (searchSpaces(spaceId)) {
      return true
    } else { return false }
  }

  const getCategoryLength = (categoryName) => {
    return categorySpaces(categoryName).length
  }

  const [currentCategory, setCurrentCategory] = useState('')
  const [currentCategorySpaces, setCurrentCategorySpaces] = useState([])
  const [currentSpaceId, setCurrentSpaceId] = useState(0)
  const [currentSpace, setCurrentSpace] = useState({ space: {}, creator: {} })
  const [volume, setVolume] = useState(0)
  const [spaceQueryParam, setSpaceQueryParam] = useQueryState('space')
  const searchParams = useSearchParams()

  const setAllSpaceDetails = (categoryName) => {
    setCurrentCategory(categoryName)
    setCurrentCategorySpaces(categorySpaces(categoryName))
    setCurrentSpaceId((currentSpaceId + 1) % getCategoryLength(categoryName))
    setCurrentSpace(fetchSpaceDetails(categoryName, currentSpaceId))
  }

  useEffect(() => {
    if (searchParams.has('space') && validateSpaceId(parseInt(searchParams.get('space')))) {
      const cat = searchSpaces(parseInt(searchParams.get('space'))).categoryName
      const id = searchSpaces(parseInt(searchParams.get('space'))).id
      const idCurrent = getIdInCurrentCategory(cat, id)

      setCurrentCategory(cat)
      setCurrentCategorySpaces(categorySpaces(cat))
      setCurrentSpaceId(idCurrent)
      setCurrentSpace(fetchSpaceDetails(cat, idCurrent))
      setSpaceQueryParam(fetchSpaceDetails(cat, idCurrent).space.id)
    } else {
      const cat = categories[Math.floor((Math.random() * categories.length))].name
      const rand = Math.floor(Math.random() * getCategoryLength(currentCategory))
      setCurrentCategory(cat)
      setCurrentCategorySpaces(categorySpaces(cat))
      setCurrentSpaceId(rand)
      setCurrentSpace(fetchSpaceDetails(cat, rand))
      setSpaceQueryParam(fetchSpaceDetails(cat, rand).space.id)
    }
  }, [searchParams])

  useEffect(() => {
    setSpaceQueryParam(currentSpace.space.id)
  }, [currentSpace])
  
  return(
    <>
      <Interact spaces={currentSpace.space} creator={currentSpace.creator} categories={categories} setAllSpaceDetails={setAllSpaceDetails} setIframeVolume={setVolume} />
      <Suspense>
        <SpacePlayer source={currentSpace.space.link} vol={volume} />
      </Suspense>
    </>
  )
}
