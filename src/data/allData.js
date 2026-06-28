import data from "../data/data.js";
import DataKhmer from "../data/DataKhmer.js";
import DataKorean from "./DataKorean.js";

export const AllData = [
  ...data,
  ...DataKhmer,
  ...DataKorean,

];

export default AllData;