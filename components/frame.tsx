"use client";

import SpacePlayer from "./space-player";
import Interact from "./interact";
import { Suspense, useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";
import {
  categoryInterface,
  creatorInterface,
  spaceInterface,
} from "@/types/types";

type FrameProps = {
  spaces: spaceInterface[];
  categories: categoryInterface[];
  creators: creatorInterface[];
};

export default function Frame({ spaces, categories, creators }: FrameProps) {
  const categorySpaces = (categoryName: string) => {
    const array: spaceInterface[] = [];
    for (let i = 0; i < spaces.length; i++) {
      if (spaces[i].categoryName === categoryName) {
        array.push(spaces[i]);
      }
    }

    return array;
  };

  const getIdInCurrentCategory = (categoryName: string, spaceId: number) => {
    const category = categorySpaces(categoryName);
    for (let i = 0; i < category.length; i++) {
      if (category[i].id === spaceId) {
        return i;
      }
    }
  };

  const fetchSpaceDetails = (
    categoryName: string = "Mystery",
    spaceId: number = 0,
  ) => {
    const space: spaceInterface = categorySpaces(categoryName)[spaceId];
    let creator: creatorInterface = creators[0];
    for (let i = 0; i < creators.length; i++) {
      if (creators[i].id === space.authorId) {
        creator = creators[i];
      }
    }

    return {
      space: space,
      creator: creator,
    };
  };

  const searchSpaces = (spaceId: number) => {
    for (let i = 0; i < spaces.length; i++) {
      if (spaceId === spaces[i].id) {
        return spaces[i];
      }
    }
    return false;
  };

  const validateSpaceId = (spaceId: number) => {
    if (searchSpaces(spaceId)) {
      return true;
    } else {
      return false;
    }
  };

  const getCategoryLength = (categoryName: string) => {
    return categorySpaces(categoryName).length;
  };

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategorySpaces, setCurrentCategorySpaces] = useState<
    spaceInterface[]
  >([]);
  const [currentSpaceId, setCurrentSpaceId] = useState<number>(0);
  const [currentSpace, setCurrentSpace] = useState<{
    space: spaceInterface | object;
    creator: creatorInterface | object;
  }>({ space: {}, creator: {} });
  const [volume, setVolume] = useState<number>(0);
  const [spaceQueryParam, setSpaceQueryParam] = useQueryState(
    "space",
    parseAsInteger,
  );
  const searchParams = useSearchParams();

  const setAllSpaceDetails = (
    categoryName: string,
    type: "increment" | "decrement" = "increment",
  ) => {
    console.log(currentSpaceId, spaceQueryParam);
    setCurrentCategory(categoryName);
    setCurrentCategorySpaces(categorySpaces(categoryName));
    setCurrentSpaceId((prevId) => {
      const newId =
        type === "increment"
          ? (prevId + 1) % getCategoryLength(categoryName)
          : (prevId - 1 + getCategoryLength(categoryName)) %
            getCategoryLength(categoryName);
      setCurrentSpace(fetchSpaceDetails(categoryName, newId));
      return newId;
    });
  };

  const changeCurrentSpace = (space: spaceInterface) => {
    setSpaceQueryParam(space.id);
    setCurrentSpace({
      space: space,
      creator: creators.find(
        (c) => c.id === (space.authorId as number),
      ) as creatorInterface,
    });
    setCurrentCategory(space.categoryName as string);
    setCurrentCategorySpaces(categorySpaces(space.categoryName as string));
    setCurrentSpaceId(
      getIdInCurrentCategory(space.categoryName as string, space.id) as number,
    );
  };

  useEffect(() => {
    if (
      searchParams.has("space") &&
      validateSpaceId(parseInt(searchParams.get("space") as string))
    ) {
      const cat = (
        searchSpaces(
          parseInt(searchParams.get("space") as string),
        ) as spaceInterface
      ).categoryName;
      const id = (
        searchSpaces(
          parseInt(searchParams.get("space") as string),
        ) as spaceInterface
      ).id;
      const idCurrent = getIdInCurrentCategory(cat as string, id);

      setCurrentCategory(cat as string);
      setCurrentCategorySpaces(categorySpaces(cat as string));
      setCurrentSpaceId(idCurrent as number);
      setCurrentSpace(fetchSpaceDetails(cat, idCurrent));
      setSpaceQueryParam(fetchSpaceDetails(cat, idCurrent).space.id);
    } else {
      const cat =
        categories[Math.floor(Math.random() * categories.length)].name;
      const rand = Math.floor(
        Math.random() * getCategoryLength(currentCategory),
      );
      setCurrentCategory(cat);
      setCurrentCategorySpaces(categorySpaces(cat));
      setCurrentSpaceId(rand);
      setCurrentSpace(fetchSpaceDetails(cat, rand));
      setSpaceQueryParam(fetchSpaceDetails(cat, rand).space.id);
    }
  }, []);

  useEffect(() => {
    setSpaceQueryParam((currentSpace.space as spaceInterface).id);
  }, [currentSpace]);

  return (
    <>
      <Interact
        space={currentSpace.space as spaceInterface}
        categorySpaces={currentCategorySpaces as spaceInterface[]}
        creator={currentSpace.creator as creatorInterface}
        changeCurrentSpace={changeCurrentSpace}
        categories={categories}
        setAllSpaceDetails={setAllSpaceDetails}
        setIframeVolume={setVolume}
      />
      <Suspense>
        <SpacePlayer
          source={(currentSpace.space as spaceInterface).link}
          vol={volume}
        />
      </Suspense>
    </>
  );
}
