import {getFreeBoardCategoriesApi, getNoticeBoardCategoriesApi} from "@/apis/main-api";
import {ALL_CATEGORY} from "@/constant/categoryConstant";

export async function getFreeBoardCategories() {
  const response = await getFreeBoardCategoriesApi()

  const categories = response.data.categories

  return [...categories, ALL_CATEGORY];
}

export async function getNoticeBoardCategories() {
  const response = await getNoticeBoardCategoriesApi()

  const categories = response.data.categories
  categories.push(ALL_CATEGORY)

  return categories
}
